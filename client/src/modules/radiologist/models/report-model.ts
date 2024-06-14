import * as Yup from "yup";
import { ReportInterface } from "../interfaces/report-interface";

export default class ReportModel {
  //*   Default form values
  static defaultValues(): ReportInterface {
    return {
      pdfFile: null,
      dicomFile: null,
      additionalComments: "",
    };
  }

  //* Define validation schema using Yup
  static reportFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object().shape({
      pdfFile: Yup.mixed()
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
      dicomFile: Yup.mixed()
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
  }

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(entity: ReportInterface): any {
    return {
      additionalComments: entity.additionalComments,
      dicomFile: entity.dicomFile,
      pdfFile: entity.pdfFile,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(json: any): ReportInterface {
    return {
      id: json.id,
      additionalComments: json.additionalComments,
      dicomFile: json.dicomFile,
      pdfFile: json.pdfFile,
    };
  }
}
