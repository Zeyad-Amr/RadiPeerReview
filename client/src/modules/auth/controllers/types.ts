import { UserInterface } from "../interfaces/user-interface";

export interface AuthState {
  loading: boolean;
  error: string;
  user: UserInterface | null;
}
