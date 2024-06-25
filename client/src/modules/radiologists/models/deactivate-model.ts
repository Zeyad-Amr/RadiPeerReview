import BaseModel from "@/core/base/base-model";
import { DeactivateInterface } from "../interfaces/deactivate-interface";

class DeactivateModel extends BaseModel<DeactivateInterface> {
  fromJson(
    json: any
  ): DeactivateInterface {
    return {
      isdeactivated:
        json.auth.isdeactivated,
    };
  }
  toJson(
    model: DeactivateInterface
  ): any {
    return { id: model.id };
  }
}
const deactivateModel =
  new DeactivateModel();
export default deactivateModel;
