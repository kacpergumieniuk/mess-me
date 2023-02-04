export const findUserByEmail = async (ctx: any, passedEmail: string) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: passedEmail,
    },
    include: {
      invitedUsers: true,
    },
  });
  return user;
};

export const isPasswordCorrect = (password: string) => password.length >= 8;
