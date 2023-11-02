import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "../api/trpc/[trpc]/route";
import SuperJSON from "superjson";

type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create({
  transformer: SuperJSON
});

export const router = trpc.router;
export const procedure = trpc.procedure;
export const mergeRouters = trpc.mergeRouters;
