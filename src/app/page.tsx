import { HomeContent } from "~/app/_components/home-content";
import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return <HomeContent isSignedIn={!!session} />;
}
