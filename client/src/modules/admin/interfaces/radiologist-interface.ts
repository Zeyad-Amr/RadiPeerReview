import { Specialization } from "@/core/shared/constants/enums";

export interface RadiologistInterface {
  id?: string;
  fname: string;
  lname: string;
  email: string;
  specializations: Specialization[];
  phone: string;
  username: string;
  password?: string;
}
