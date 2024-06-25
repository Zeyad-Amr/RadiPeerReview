import { ChangePasswordInterface } from "../interfaces/change-password-interface";
import { UserInterface } from "../interfaces/user-interface";

export interface AuthState {
  loading: boolean;
  error: string;
  user: UserInterface | null;
}

export interface changePasswordState {
  loading: boolean;
  error: string;
  password: ChangePasswordInterface | null;
}

export interface allUsersState {
  loading: boolean;
  error: string;
  users: UserInterface[];
}
