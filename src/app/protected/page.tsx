import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Protected() {
  const user = await getServerSession(authOptions);

  if (!user) {
    redirect("/");
  }

  return (
    <h1>Protected page</h1>
  )
}