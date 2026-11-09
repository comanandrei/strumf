import "./sanitize-auth-url-env";

import {
  CredentialsSignin,
  type DefaultSession,
  type NextAuthConfig,
  type Session,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { env } from "~/env";
import { resolveAuthSecret } from "~/server/lib/auth-secret";
import {
  getBootstrapAdminEmail,
  getBootstrapAdminPassword,
  isBootstrapAdminEmail,
  isBootstrapAdminLogin,
} from "~/server/lib/bootstrap-admin";
import { db } from "~/server/db";
import { normalizeEmail } from "~/server/lib/household-access";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
/** Maps to `error=CredentialsSignin&code=service_unavailable` so the UI can explain instead of `Configuration`. */
class ServiceUnavailableSignin extends CredentialsSignin {
  constructor() {
    super();
    this.code = "service_unavailable";
  }
}

/** `instanceof` is unreliable with bundled Prisma in Next.js; use `name` + `code` instead. */
function isPrismaConnectivityError(error: unknown): boolean {
  if (typeof error !== "object" || !error) return false;
  const c = (error as { constructor?: { name?: string } }).constructor?.name;
  if (c === "PrismaClientInitializationError" || c === "PrismaClientUnknownRequestError")
    return true;
  if (c === "PrismaClientKnownRequestError" && "code" in error) {
    return ["P1000", "P1001", "P1002", "P1003", "P1008", "P1010", "P1011", "P1017"].includes(
      (error as { code: string }).code,
    );
  }
  return false;
}

/** Strip Prisma fields (e.g. passwordHash) so JWT encoding never sees non-public data. */
function toAuthUser(record: {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
}): User {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    image: record.image,
  };
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isBootstrapAdmin: boolean;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  // Must match `src/app/api/auth/[...nextauth]`. If AUTH_URL uses pathname `/auth`,
  // Auth.js would otherwise point the browser at the wrong callback and sign-in breaks.
  basePath: "/api/auth",
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: resolveAuthSecret(),
  // Credentials + JWT: no PrismaAdapter/DB session rows. (Adapter would also mix DB session
  // defaults with credentials in subtle ways; we only need JWT for this app today.)
  session: { strategy: "jwt" },
  trustHost: true,
  debug: process.env.NODE_ENV !== "production",
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const email = normalizeEmail(parsed.data.email);

        try {
          if (isBootstrapAdminLogin(email, parsed.data.password)) {
            const bootstrapEmail = getBootstrapAdminEmail();
            const bootstrapPassword = getBootstrapAdminPassword();
            if (!bootstrapEmail || !bootstrapPassword) return null;

            let user = await db.user.findUnique({
              where: { email: bootstrapEmail },
            });
            const passwordHash = await bcrypt.hash(bootstrapPassword, 12);
            if (!user) {
              user = await db.user.create({
                data: {
                  email: bootstrapEmail,
                  name: "Bootstrap Admin",
                  passwordHash,
                  emailVerified: new Date(),
                  isActive: true,
                },
              });
            } else {
              const hashOk =
                !!user.passwordHash &&
                (await bcrypt.compare(bootstrapPassword, user.passwordHash));
              const ready = !!user.emailVerified && user.isActive;
              if (!hashOk || !ready) {
                user = await db.user.update({
                  where: { id: user.id },
                  data: {
                    passwordHash,
                    emailVerified: new Date(),
                    isActive: true,
                  },
                });
              }
            }
            return toAuthUser(user);
          }

          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user?.passwordHash) return null;

          const skipVerify = env.SKIP_EMAIL_VERIFICATION === "true";
          if (!skipVerify && !user.emailVerified) return null;
          if (!user.isActive) return null;

          const isValid = await bcrypt.compare(
            parsed.data.password,
            user.passwordHash,
          );
          if (!isValid) return null;

          return toAuthUser(user);
        } catch (e) {
          if (e instanceof CredentialsSignin) throw e;
          if (isPrismaConnectivityError(e)) {
            console.error(
              "[auth] database unreachable — check DATABASE_URL and that Postgres is running",
              e,
            );
            throw new ServiceUnavailableSignin();
          }
          console.error("[auth] credentials authorize failed", e);
          throw e;
        }
      },
    }),
  ],
  callbacks: {
    // Default redirect uses `new URL(url)`; a malformed `callbackUrl` in the sign-in form throws
    // a TypeError and Auth.js reports `error=Configuration` (it only surfaces client-safe
    // AuthError types in the query string).
    redirect({ url, baseUrl }) {
      if (typeof url !== "string" || !url) return baseUrl;
      if (url.startsWith("/") && !url.startsWith("//")) return `${baseUrl}${url}`;
      try {
        const u = new URL(url);
        if (u.protocol !== "http:" && u.protocol !== "https:") return baseUrl;
        if (u.origin === new URL(baseUrl).origin) return u.href;
        return baseUrl;
      } catch {
        return baseUrl;
      }
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    session({
      session,
      user,
      token,
    }: {
      session: Session;
      user?: import("next-auth").User | null;
      token?: import("next-auth/jwt").JWT | null;
    }) {
      const email =
        (typeof token?.email === "string" ? token.email : null) ??
        user?.email ??
        session.user?.email ??
        "";
      const id = token?.sub ?? user?.id ?? "";
      return {
        ...session,
        user: {
          ...session.user,
          id,
          email: email || session.user?.email,
          isBootstrapAdmin: isBootstrapAdminEmail(email),
        },
      };
    },
  },
} satisfies NextAuthConfig;
