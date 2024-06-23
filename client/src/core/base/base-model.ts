import { Yup } from "../shared/utils/validation";

abstract class BaseModel<I> {
    defaultValues?: I;
    validationSchema?: Yup.ObjectSchema<any>;
    abstract fromJson(json: any): I;
    abstract toJson(model: I): any;

}

export default BaseModel;
