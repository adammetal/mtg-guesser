"use server";

import { trpc } from "@/trpc/trpcRsc";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  cmc: z.number(),
  colors: z.array(z.string()),
});

type Params = z.infer<typeof schema>;

export async function scoreTheAnswer(input: Params) {
  const validated = schema.safeParse(input);

  if (!validated.success) {
    return {
      errors: "invalid input",
    };
  }

  return await trpc.scoreUserGuess(validated.data);
}
