import { httpBatchLink, loggerLink } from '@trpc/client';
import SuperJSON from 'superjson';

const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000/api/trpc/";

export const options = () => ({
  links: [
    loggerLink({
      enabled: () => true,
    }),
    httpBatchLink({
      url,
    }),
  ],
  transformer: SuperJSON,
});
