import { DeactivateInterface } from "../interfaces/deactivate-interface";
import { RadiologistInterface } from "../interfaces/radiologist-interface";

export interface RadiologistState {
  radiologists: RadiologistInterface[];
  currentRadiologist: RadiologistInterface;
  loading: boolean;
  error: string;
}
export interface DeactivateState {
  loading: boolean;
  error: string;
  isdeactivated: boolean;
}