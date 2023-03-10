import { z } from "zod";
import { findUserByEmail } from "../../../utils/userRouterHelperFunctions";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const conversationRouter = createTRPCRouter({
  initializeConversation: publicProcedure
    .input(z.object({ creatorEmail: z.string(), participantEmail: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const conversation = await ctx.prisma.conversation.create({
        data: {
          users: {
            connect: [
              { email: input.creatorEmail },
              { email: input.participantEmail },
            ],
          },
        },
      });
      return conversation;
    }),
});
