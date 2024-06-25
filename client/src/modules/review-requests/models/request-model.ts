import * as Yup from "yup";
import {
  CreateRequestInterface,
  GetReportInterface,
  GetRequestInterface,
} from "../interfaces/request-interface";
import reviewDataModel from "./review-model";
import { fFullDateTime } from "@/core/shared/utils/format-time";

class ReportModel {
  //*   Default form values
  defaultValues: CreateRequestInterface = {
    report: null,
    result: null,
    additionalComments: "",
    name: "",
  };

  //* Define validation schema using Yup
  validationSchema = (isCreateRequest: boolean) => Yup.object().shape({
    report: Yup.mixed()
      .required("A PDF file is required")
      .test(
        "fileSize",
        "File size too large",
        (value) => value && (value as File).size <= 10485760 // 10 MB
      )
      .test(
        "fileFormat",
        "Unsupported file format",
        (value) => value && /\.(pdf)$/i.test((value as File).name) // Check for .pdf extension
      ),
    result: Yup.mixed()
      .required("A DICOM file is required")
      .test(
        "fileSize",
        "File size too large",
        (value) => value && (value as File).size <= 10485760 // 10 MB
      )
      .test(
        "fileFormat",
        "Unsupported file format",
        (value) => value && /\.(dcm|dicom)$/i.test((value as File).name) // Check for .dcm or .dicom extension
      ),
    additionalComments: Yup.string().max(500, "Maximum 500 characters"),
    name: Yup.string().when([], {
      is: () => isCreateRequest,
      then: schema => schema.required("Name is required"),
      otherwise: schema => schema.optional(),
    }),
  });

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  toJson(entity: CreateRequestInterface): any {
    return {
      additionalComments: entity.additionalComments,
      result: entity.result,
      report: entity.report,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  fromJson(json: any): GetRequestInterface {
    return {
      id: json.id,
      name : json.name,
      reviewerId: json.reviewerId,
      status: json.status,
      createdAt: fFullDateTime(json.createdAt),
      updatedAt: fFullDateTime(json.updatedAt),
      creatorId: json.creatorId,
      creator: json.creator,
      report: json?.report ? json?.report?.sort((a: any, b: any) => new Date(a.createdAt as string).getTime() - new Date(b.createdAt as string).getTime()).map((el: any) => this.fromReportJson(el)) : [],
    };
  }

  fromReportJson(json: any): GetReportInterface {
    return {
      id: json.id,
      additionalComments: json.additionalComments,
      createdAt: fFullDateTime(json.createdAt),
      reportUrl: json.reportUrl,
      resultUrl: json.resultUrl,
      reviewId: json.reviewId,
      review: json?.Review ? reviewDataModel.fromJson(json.Review) : null,
      reviewRequestId: json.reviewRequestId,
      updatedAt: fFullDateTime(json.updatedAt),
    };
  }
}

const reportModel = new ReportModel();
export default reportModel;
