import { UserInterface } from "@/modules/auth/interfaces/user-interface";

export interface RadiologistState {
  radiologists: UserInterface[];
  currentRadiologist: UserInterface;
  loading: boolean;
  error: string;
}
export interface DeactivateState {
  loading: boolean;
  error: string;
  isdeactivated: boolean;
}
