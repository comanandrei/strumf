import Image from "next/image";
import Link from "next/link";

import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,#fbf8ef_0%,#eef7f1_100%)] text-[#22332d]">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <Image
          src="/baby-hero.jpg"
          alt="Sleeping baby illustration"
          width={180}
          height={180}
          priority
          className="h-44 w-44 rounded-full object-cover shadow-[0_18px_50px_rgba(127,161,148,0.28)]"
        />
        <h1 className="text-5xl font-extrabold tracking-tight text-[#7fa194] sm:text-[5rem]">
          <span>Strumf</span>
        </h1>
        <p className="max-w-md text-center text-lg font-medium text-[#5f7068]">
          Baby feeding and care — households, caregivers, bottle logs, and more.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={session ? "/app" : "/auth"}
            className="rounded-full bg-[#7fa194] px-10 py-3 font-semibold text-white no-underline shadow-[0_10px_30px_rgba(127,161,148,0.32)] transition hover:bg-[#6d9184]"
          >
            {session ? "Open app" : "Log in"}
          </Link>
          {session ? (
            <Link
              href="/api/auth/signout"
              className="rounded-full border border-[#7fa194]/30 bg-white/70 px-10 py-3 font-semibold text-[#5f7068] no-underline transition hover:bg-white"
            >
              Sign out
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
