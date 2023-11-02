import { z } from "zod";
import { procedure, router } from "../trpc";

const getDemo = procedure
  .input(z.object({ name: z.string().optional() }))
  .query(({ input, ctx }) => {
    const { name } = input;
    const user = ctx.session?.user?.name;
    return `Hello ${user ?? name ?? "Who's there?"}`;
  });

export default router({
  getDemo,
});
