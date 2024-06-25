import BaseModel from "@/core/base/base-model";
import { ReviewRequestInterface } from "../interfaces/review-request-interface";
import { fFullDateTime } from "@/core/shared/utils/format-time";

class ReviewRequestModel extends BaseModel<ReviewRequestInterface> {
  fromJson(json: any): ReviewRequestInterface {
    return {
      id: json.id,
      name: json.name,
      creator: json.creator.radiologist,
      reviewer: json.reviewer?.radiologist,
      status: json.status,
      score:
        json.report[json.report.length - 1]?.Review?.overallAssessment
          .overallQuality,
      createdAt: fFullDateTime(json.createdAt),
      updatedAt: fFullDateTime(json.updatedAt),
    };
  }

  toJson(model: ReviewRequestInterface): any {
    return {
      reviewerId: model.reviewerId,
    };
  }
}
const reviewRequestModel = new ReviewRequestModel();
export default reviewRequestModel;
