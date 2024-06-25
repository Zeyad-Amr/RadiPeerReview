import { Role } from "@/core/shared/constants/enums";
import { radio } from "../../../core/theme/overrides/components/radio";
import { RadiologistInterface } from "@/modules/radiologists/interfaces/radiologist-interface";

export interface UserInterface {
  id: string;
  username: string;
  password?: string;
  isdeactivated: boolean;
  role: Role;
  createdAt: string;
  updatedAt: string;
  radiologist?: RadiologistInterface;
}

// mainly RadiologistInterface
export interface UserFormInterface {
  id?: string;
  username: string;
  password: string;
  fname: string;
  lname: string;
  email: string;
  specializations: string[];
  phone: string;
}
