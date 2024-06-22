import { RadiologistInterface } from "../interfaces/radiologist-interface";

export interface RadiologistState {
  radiologists: RadiologistInterface[];
  currentRadiologist: RadiologistInterface;
  loading: boolean;
  error: string;
}
