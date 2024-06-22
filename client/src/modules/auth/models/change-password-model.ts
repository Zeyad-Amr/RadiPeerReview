import BaseModel from "@/core/base/base-model";
import { ChangePasswordInterface } from "../interfaces/change-password-interface";
import { Yup } from "@/core/shared/utils/validation";

class ChangePasswordModel extends BaseModel<ChangePasswordInterface> {
  defaultValues: ChangePasswordInterface =
    {
      oldPassword: "",
      newPassword: "",
    };
  validationSchema = Yup.object().shape(
    {
      oldPassword:
        Yup.string().required(
          "Old Password is required"
        ),
      newPassword:
        Yup.string().required(
          "New Password is required"
        ),
    }
  );
  fromJson(
    json: any
  ): ChangePasswordInterface {
    return {
      oldPassword: json.oldPassword,
      newPassword: json.newPassword,
    };
  }
  toJson(
    model: ChangePasswordInterface
  ): any {
    return {
      oldPassword: model.oldPassword,
      newPassword: model.newPassword,
    };
  }
}
const changePasswordModel = new ChangePasswordModel();
export default changePasswordModel;
