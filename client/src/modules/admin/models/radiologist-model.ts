import * as Yup from "yup";
import { RadiologistInterface } from "../interfaces/radiologist-interface";

export default class RadiologistModel {
  //*   Default form values
  static defaultValues(): RadiologistInterface {
    return {
      fname: "",
      lname: "",
      email: "",
      specializations: ['0'],
      phone: "",
      username: "",
      password: "",
    };
  }

  //* Define validation schema using Yup
  static radiologistFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      fname: Yup.string().required(
        "First name is required"
      ),
      lname: Yup.string().required(
        "Last name is required"
      ),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      specializations: Yup.array()
        .of(
          Yup.string().required(
            "Specialization is required"
          )
        )
        .required(
          "Specializations are required"
        ),
      phone: Yup.string()
        .matches(
          /^01\d{9}$/,
          "Phone number is not valid"
        ) 
        .required(
          "Phone number is required"
        ),
      username: Yup.string().required(
        "Username is required"
      ),
      password: Yup.string().required(
        "Password is required"
      ),
    });
  }

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(
    entity: RadiologistInterface
  ): any {
    return {
      fname: entity.fname,
      lname: entity.lname,
      email: entity.email,
      specializations:
        entity.specializations,
      phone: entity.phone,
      username: entity.username,
      password: entity.password,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(
    json: any
  ): RadiologistInterface {
    return {
      id: json.id,
      fname: json.fname,
      lname: json.lname,
      email: json.email,
      specializations:
        json.specializations,
      phone: json.phone,
      username: json.username,
      password: json.password,
    };
  }
}
