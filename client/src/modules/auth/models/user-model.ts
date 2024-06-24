import BaseModel from "@/core/base/base-model";
import { AuthInterface } from "../interfaces/auth-interface";
import { Yup } from "@/core/shared/utils/validation";
import { UserInterface } from "../interfaces/user-interface";
import { Role } from "@/core/shared/constants/enums";
import RadiologistModel from "@/modules/admin/models/radiologist-model";

class UserModel extends BaseModel<UserInterface> {
  defaultValues: UserInterface = {
    id: "",
    username: "",
    email: "",
    role: Role.RADIOLOGIST,
    createdAt: "",
    updatedAt: "",
    radiologist: undefined,
  };

  validationSchema = Yup.object().shape({});
  fromJson(json: any): UserInterface {
    return {
      id: json.id,
      username: json.username,
      email: json.email,
      role: json.role,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      radiologist: json.radiologist
        ? RadiologistModel.fromJson(json.radiologist)
        : undefined,
    };
  }
  toJson(model: UserInterface): any {
    return {};
  }
}
const userModel = new UserModel();
export default userModel;
