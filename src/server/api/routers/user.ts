import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { isUniqueEmail } from "../../../utils/userRouterHelperFunctions";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await isUniqueEmail(ctx, input.email);
      if (user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Email ${input.email} is already in use.`,
        });
      }
      const newlyCreatedUser = await ctx.prisma.user.create({
        data: input,
      });
      return newlyCreatedUser;
    }),
});
