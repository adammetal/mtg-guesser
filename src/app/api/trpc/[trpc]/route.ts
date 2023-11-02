import {
  fetchRequestHandler
} from "@trpc/server/adapters/fetch";

import { appRouter } from "@/app/_trpc/routers/_app";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const createContext = async () => {
  const session = await getServerSession(authOptions);
  return {
    session,
  };
};

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
    req,
  });
};

export { handler as GET, handler as POST };
