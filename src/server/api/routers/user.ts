import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  findUserByEmail,
  isPasswordCorrect,
} from "../../../utils/userRouterHelperFunctions";
import type { User } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { IUser } from "../../../types/apiTypes";

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
      const userByEmail: IUser = await findUserByEmail(ctx, input.email);
      return userByEmail;
    }),
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.prisma.user.findMany();
    return allUsers;
  }),
  addUserToFriend: publicProcedure
    .input(
      z.object({ userInvitingEmail: z.string(), invitedUserEmail: z.string() })
    ) // Need to be changed to id instead of email for consistency
    .mutation(async ({ input, ctx }) => {
      /*       const userToAdd: User = await findUserByEmail(
        ctx,
        input.invitedUserEmail
      ); */

      const updatedUser = await ctx.prisma.user.update({
        where: {
          email: input.userInvitingEmail,
        },
        data: {
          invitedUsers: {
            connect: {
              email: input.invitedUserEmail,
            },
          },
        },
      });

      return updatedUser;
    }),
});
