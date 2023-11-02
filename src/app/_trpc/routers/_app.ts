import { mergeRouters } from "@/app/_trpc/trpc";
import demo from "./demo";
import events from "./events";

export const appRouter = mergeRouters(demo, events);
export type AppRouter = typeof appRouter;
