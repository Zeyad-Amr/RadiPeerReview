import BaseModel from "@/core/base/base-model";
import { AuthInterface } from "../interfaces/auth-interface";
import { Yup } from "@/core/shared/utils/validation";

class AuthModel extends BaseModel<AuthInterface> {
    defaultValues: AuthInterface = {
        username: "",
        password: "",
    };
    validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });
    fromJson(json: any): AuthInterface {
        return {
            username: json.username,
            password: json.password,
        };
    }
    toJson(model: AuthInterface): any {
        return {
            username: model.username,
            password: model.password,
        };
    }

}
const authModel = new AuthModel();
export default authModel;