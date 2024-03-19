import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "./routers/_app";
import { options } from "./trpcOptions";

export const trpc = createTRPCClient<AppRouter>(options());
