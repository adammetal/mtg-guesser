import { createTRPCProxyClient } from "@trpc/client";
import type { AppRouter } from "./routers/_app";
import { options } from "./trpcOptions";

export const trpc = createTRPCProxyClient<AppRouter>(options());
