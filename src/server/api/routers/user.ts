import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  findUserByEmail,
  isPasswordCorrect,
} from "../../../utils/userRouterHelperFunctions";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({ email: z.string(), password: z.string(), name: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await findUserByEmail(ctx, input.email);
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
  changeUsername: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const updatedNameUser = await ctx.prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          name: input.name,
        },
      });
      return updatedNameUser;
    }),

  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const userByEmail = await findUserByEmail(ctx, input.email);
      return userByEmail;
    }),
});
