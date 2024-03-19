import Login from "@/components/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const user = await getServerSession(authOptions);

  return (
    <main className="flex justify-center">
      <div className="w-3/4 text-center">
        <h1 className="text-4xl m-4">MTG Card Guesser</h1>
        {!user && <Login />}
        {user && (
          <Link
            className="py-1 px-3 text-2xl bg-amber-600 text-white shadow-md"
            href="/game"
          >
            Let&apos;s start the game
          </Link>
        )}
      </div>
    </main>
  );
}
