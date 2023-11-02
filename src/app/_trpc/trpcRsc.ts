import { createContext } from "../api/trpc/[trpc]/route";
import { appRouter } from "./routers/_app";

export const trpc = appRouter.createCaller(await createContext());
