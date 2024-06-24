import BaseModel from "@/core/base/base-model";
import { ReviewRequestInterface } from "../interfaces/review-request-interface";

class ReviewRequestModel extends BaseModel<ReviewRequestInterface> {
  fromJson(
    json: any
  ): ReviewRequestInterface {
    return {
      id: json.id,
      name: json.name,
      creator: json.creator.radiologist,
      reviewer:
        json.reviewer?.radiologist,
      status: json.status,
      approved: json.approved,
    };
  }

  toJson(
    model: ReviewRequestInterface
  ): any {
    return {
      reviewerId: model.reviewerId,
    };
  }
}
const reviewRequestModel =
  new ReviewRequestModel();
export default reviewRequestModel;
