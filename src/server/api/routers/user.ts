import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  isPasswordCorrect,
  isUniqueEmail,
} from "../../../utils/userRouterHelperFunctions";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({ email: z.string(), password: z.string(), name: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await isUniqueEmail(ctx, input.email);
      const isPasswordCorrectRes = isPasswordCorrect(input.password);
      if (user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `Email ${input.email} is already in use.`,
        });
      }
      if (!isPasswordCorrectRes) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Password need to be at least 8 character long.`,
        });
      }
      const newlyCreatedUser = await ctx.prisma.user.create({
        data: input,
      });
      return newlyCreatedUser;
    }),
});
