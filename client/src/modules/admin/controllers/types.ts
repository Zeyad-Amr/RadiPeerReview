import { PaginatedList } from "@/core/api";
import { RadiologistInterface } from "../interfaces/radiologist-interface";

export interface RadiologistState {
  radiologists: PaginatedList<RadiologistInterface>;
  currentRadiologist: RadiologistInterface;
  isFetched: boolean;
  loading: boolean;
  error: string;
}
