import { Yup } from "../shared/utils/validation";

abstract class BaseModel<I> {
    abstract defaultValues: I;
    abstract validationSchema: Yup.ObjectSchema<any>;
    abstract fromJson(json: any): I;
    abstract toJson(model: I): any;

}

export default BaseModel;
