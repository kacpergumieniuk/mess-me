export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  invitedUsers: IUser[];
  invitationsFromUsers: IUser[];
}
