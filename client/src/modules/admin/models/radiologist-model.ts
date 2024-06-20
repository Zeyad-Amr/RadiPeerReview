import * as Yup from "yup";
import { RadiologistInterface } from "../interfaces/radiologist-interface";
import BaseModel from "@/core/base/base-model";

class RadiologistModel extends BaseModel<RadiologistInterface> {
  defaultValues: RadiologistInterface = {
    fname: "",
    lname: "",
    email: "",
    specializations: [],
    phone: "",
    username: "",
    password: "",
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
  fromJson(json: any): RadiologistInterface {
    return {
      id: json.id,
      fname: json.fname,
      lname: json.lname,
      email: json.email,
      specializations: json.specializations,
      phone: json.phone,
      username: json.username ?? "",
    };
  }
  toJson(model: RadiologistInterface): any {
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
}
const radiologistModel = new RadiologistModel();
export default radiologistModel;
