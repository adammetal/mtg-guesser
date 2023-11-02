import { trpc } from "./_trpc/trpcRsc";
import Login from "./_components/Login";

export default async function Home() {
  const message = await trpc.getDemo({ name: "Adam" });

  return (
    <main className="min-h-screen">
      <h1>{message}</h1>
      <Login />
    </main>
  );
}
