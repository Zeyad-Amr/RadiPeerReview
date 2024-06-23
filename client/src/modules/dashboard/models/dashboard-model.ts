import BaseModel from "@/core/base/base-model";
import { dashboardInterface } from "../interfaces/dashboard-interface";

class ReviewRequestModel extends BaseModel<dashboardInterface> {
  fromJson(
    json: any
  ): dashboardInterface {
    return {
      response: json,
    };
  }
  toJson(
    model: dashboardInterface
  ): any {}
}
const reviewRequestModel =
  new ReviewRequestModel();
export default reviewRequestModel;
