import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { trpc } from "@/trpc/trpcRsc";
import Puzzle from "@/components/Puzzle";

export default async function Game() {
  const user = await getServerSession(authOptions);

  if (!user) {
    return redirect("/");
  }

  const card = await trpc.getRandomCard({ yearFrom: 2000 });

  return (
    <main className="flex justify-center p-8">
      <Puzzle card={card} />
    </main>
  );
}
