export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  invitedUsers: IUser[];
  invitationsFromUsers: IUser[];
  friends: string;
  conversations: IConversation[];
}

export interface IConversation {
  id: string;
  users: IUser[];
  createdAt: Date;
  messages: IMessage[];
}

export interface IMessage {
  id: string;
  text: string;
  conversation: IConversation;
  conversationId: string;
  userId: string;
  createdAt: Date;
}
