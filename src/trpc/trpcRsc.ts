import { createCallerFactory } from "./trpc";
import { createContext } from "@/app/api/trpc/[trpc]/route";
import { appRouter } from "./routers/_app";

const createCaller = createCallerFactory(appRouter);

export const trpc = createCaller(await createContext());