import * as Yup from "yup";
import { CreateRequestInterface, GetReportInterface, GetRequestInterface } from "../interfaces/request-interface";
import BaseModel from "@/core/base/base-model";

class ReportModel {
  //*   Default form values
  defaultValues: CreateRequestInterface = {
    report: null,
    result: null,
    additionalComments: "",
  };

  //* Define validation schema using Yup
  validationSchema = Yup.object().shape({
    report : Yup.mixed()
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
      reviewerId: json.reviewerId,
      status: json.status,
      approved: json.approved,
      createdAt: json.createdAt,
      creatorId : json.creatorId,
      creator : json.creator,
      report: json?.report?.map((el : any ) => this.fromReportJson(el)),
    };
  }

  fromReportJson(json: any): GetReportInterface {
    return {
      id: json.id,
      additionalComments: json.additionalComments,
      createdAt: json.createdAt,
      reportUrl: json.reportUrl,
      resultUrl: json.resultUrl,
      reviewId: json.reviewId,
      reviewRequestId: json.reviewRequestId,
      updatedAt: json.updatedAt,
    };
  }
}

const reportModel = new ReportModel();
export default reportModel;
