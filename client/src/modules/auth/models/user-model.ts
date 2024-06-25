import BaseModel from "@/core/base/base-model";
import { AuthInterface } from "../interfaces/auth-interface";
import { Yup } from "@/core/shared/utils/validation";
import { UserFormInterface, UserInterface } from "../interfaces/user-interface";
import { Role } from "@/core/shared/constants/enums";
import RadiologistModel from "@/modules/radiologists/models/radiologist-model";

class UserModel extends BaseModel<UserInterface> {
  defaultValues: UserInterface = {
    id: "",
    username: "",
    isdeactivated: true,
    role: Role.RADIOLOGIST,
    createdAt: "",
    updatedAt: "",
    radiologist: undefined,
  };

  defaultFormValues: UserFormInterface = {
    username: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
    specializations: [],
    phone: "",
  };

  validationSchema = Yup.object({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    specializations: Yup.array()
      .of(Yup.string().required("Specialization is required"))
      .required("Specializations are required"),
    phone: Yup.string()
      .matches(/^01\d{9}$/, "Phone number is not valid")
      .required("Phone number is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  editValidationSchema = Yup.object({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    specializations: Yup.array()
      .of(Yup.string().required("Specialization is required"))
      .required("Specializations are required"),
    phone: Yup.string()
      .matches(/^01\d{9}$/, "Phone number is not valid")
      .required("Phone number is required"),
  });
  fromJson(json: any): UserInterface {
    return {
      id: json.id,
      username: json.username,
      isdeactivated: json.isdeactivated,
      role: json.role,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      radiologist: json.radiologist
        ? RadiologistModel.fromJson(json.radiologist)
        : undefined,
    };
  }
  fromRadiologistJson(json: any): UserInterface {
    return {
      id: json.auth.id,
      username: json.auth.username,
      isdeactivated: json.auth.isdeactivated,
      role: json.auth.role,
      createdAt: json.auth.createdAt,
      updatedAt: json.auth.updatedAt,
      radiologist: RadiologistModel.fromJson(json),
    };
  }

  toJson(model: UserInterface): any {
    return {};
  }

  toJsonCreate(model: UserFormInterface): any {
    return {
      fname: model.fname,
      lname: model.lname,
      email: model.email,
      specializations: model.specializations,
      phone: model.phone,
      username: model.username,
      password: model.password,
    };
  }
  toJsonUpdate(model: UserFormInterface): any {
    return {
      fname: model.fname,
      lname: model.lname,
      email: model.email,
      specializations: model.specializations,
      phone: model.phone,
    };
  }
}
const userModel = new UserModel();
export default userModel;
