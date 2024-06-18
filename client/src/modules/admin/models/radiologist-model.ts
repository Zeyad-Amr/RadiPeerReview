import * as Yup from "yup";
import { RadiologistInterface } from "../interfaces/radiologist-interface";

export default class RadiologistModel {
  //*   Default form values
  static defaultValues(): RadiologistInterface {
    return {
      fname: "",
      lname: "",
      email: "",
      specialization: "",
      phone: "",
    };
  }

  //* Define validation schema using Yup
  validationSchema = Yup.object().shape(
    {
      username: Yup.string().required(
        "Username is required"
      ),
      password: Yup.string().required(
        "Password is required"
      ),
    }
  );
  static radiologistFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      fname: Yup.string().required(
        "First Name is required"
      ),
      lname: Yup.string().required(
        "Last Name is required"
      ),
      email: Yup.string().required(
        "Email is required"
      ),
      specialization: Yup.string().required(
        "Specialization is required"
      ),
      phone: Yup.string().required(
        "Phone Number is required"
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
      specialization:
        entity.specialization,
      phone: entity.phone,
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
      specialization:
        json.specialization,
      phone: json.phone,
    };
  }
}
