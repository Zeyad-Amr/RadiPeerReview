import { Role } from "@/core/shared/constants/enums";
import { radio } from "../../../core/theme/overrides/components/radio";
import { RadiologistInterface } from "@/modules/admin/interfaces/radiologist-interface";

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  radiologist?: RadiologistInterface;
}
