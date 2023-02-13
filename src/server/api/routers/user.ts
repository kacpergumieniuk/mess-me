import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  findUserByEmail,
  isPasswordCorrect,
} from "../../../utils/userRouterHelperFunctions";
import type { User } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { IUser } from "../../../types/apiTypes";
import { handleAddUserEmailToFriendsString } from "../../../utils/handleAddUserEmailToFriendsString";
import { prepFriendsArrayFunction } from "../../../utils/prepFriendsArrayFunction";

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
  acceptFriendsInvitation: publicProcedure
    .input(
      z.object({ userInvitingEmail: z.string(), invitedUserEmail: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      const invitingUser = await findUserByEmail(ctx, input.userInvitingEmail);
      const invitedUser = await findUserByEmail(ctx, input.invitedUserEmail);

      //Add invited user to inviting user friends
      const newInvitingUserFriendsString = handleAddUserEmailToFriendsString(
        invitingUser.friends,
        input.invitedUserEmail
      );

      const updatedInvitingUser = await ctx.prisma.user.update({
        where: {
          email: input.userInvitingEmail,
        },
        data: {
          friends: newInvitingUserFriendsString,
        },
      });

      //Add inviting user to invited user friends
      const newInvitedUserFriendsString = handleAddUserEmailToFriendsString(
        invitedUser.friends,
        input.userInvitingEmail
      );

      const updatedInvitedUser = await ctx.prisma.user.update({
        where: {
          email: input.invitedUserEmail,
        },
        data: {
          friends: newInvitedUserFriendsString,
        },
      });

      return [updatedInvitedUser, updatedInvitingUser];
    }),
  getUserFriends: publicProcedure
    .input(z.object({ userEmail: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await findUserByEmail(ctx, input.userEmail);
      const friendsArr = prepFriendsArrayFunction(user.friends);
      const friends = await ctx.prisma.user.findMany({
        where: {
          email: {
            in: friendsArr,
          },
        },
      });
      return friends;
    }),
});
