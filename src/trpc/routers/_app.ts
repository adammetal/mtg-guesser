import { mergeRouters } from "@/trpc/trpc";
import demo from "./demo";
import cards from "./cards";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

export const appRouter = mergeRouters(demo, cards);
export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
