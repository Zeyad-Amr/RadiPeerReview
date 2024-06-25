import { ChangePasswordInterface } from "../interfaces/change-password-interface";
import { UserInterface } from "../interfaces/user-interface";

export interface AuthState {
  loading: boolean;
  error: string;
  user: UserInterface | null;
}

export interface ChangePasswordState {
  loading: boolean;
  error: string;
}
