import { UserInterface } from "../interfaces/user-interface";

export interface AuthState {
  loading: boolean;
  error: string;
  user: UserInterface | null;
}

export interface allUsersState {
  loading: boolean;
  error: string;
  users: UserInterface[];
}
