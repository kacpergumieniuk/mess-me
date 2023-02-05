import { IUser } from "../types/apiTypes";

export const findUserByEmail = async (ctx: any, passedEmail: string) => {
  const user: IUser = await ctx.prisma.user.findUnique({
    where: {
      email: passedEmail,
    },
    include: {
      invitedUsers: true,
      invitationsFromUsers: true,
    },
  });
  return user;
};

export const isPasswordCorrect = (password: string) => password.length >= 8;
