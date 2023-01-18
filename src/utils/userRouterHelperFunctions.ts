export const isUniqueEmail = async (ctx: any, passedEmail: string) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email: passedEmail,
    },
  });
  return user;
};
