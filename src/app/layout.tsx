import "~/styles/globals.css";

import { type Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";

import { AppProviders } from "~/app/providers";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Strumf",
  description: "Un jurnal cald pentru hraniri si momente de ingrijire.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>
        <AppProviders>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AppProviders>
      </body>
    </html>
  );
}
