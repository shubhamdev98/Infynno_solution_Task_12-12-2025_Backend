export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  refreshToken: string | null;
}

export interface IUserCreation {
  name: string;
  email: string;
  password: string;
}
