import { createContext } from "@/app/api/trpc/[trpc]/route";
import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

type Context = Awaited<ReturnType<typeof createContext>>;

export const trpc = initTRPC.context<Context>().create({
  transformer: SuperJSON
});

export const router = trpc.router;
export const procedure = trpc.procedure;
export const mergeRouters = trpc.mergeRouters;
export const createCallerFactory = trpc.createCallerFactory;
