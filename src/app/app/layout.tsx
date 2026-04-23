import { redirect } from "next/navigation";

import { AppShell } from "~/app/app/_components/app-shell";
import { auth } from "~/server/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth");
  }

  return <AppShell>{children}</AppShell>;
}
