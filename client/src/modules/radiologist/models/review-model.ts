import * as Yup from "yup";
import BaseModel from "@/core/base/base-model";
import { AccuracyOfFindings, ClarityAndCompleteness, ComplianceAndStandardization, ImpressionAndRecommendations, MissedFinding, OverallAssessment, ReviewDataInterface, TechnicalQuality } from "../interfaces/review-interface";

class ReviewDataModel extends BaseModel<ReviewDataInterface> {
  //*   Default form values
  defaultValues: ReviewDataInterface = {
    accuracyOfFindings: {
      correctnessOfFindings: true,
      commentsOnAccuracy: "",
      missedFindings: [],
    },
    clarityAndCompleteness: {
      clarityOfLanguage: 1,
      commentsOnLanguage: "",
      completenessOfReport: 1,
      commentsOnCompleteness: "",
    },
    impressionAndRecommendations: {
      accuracyOfImpression: true,
      commentsOnImpression: "",
      appropriatenessOfRecommendations: 1,
      suggestionsForRecommendations: "",
    },
    technicalQuality: {
      imagingTechnique: 1,
      commentsOnTechnique: "",
      imageQuality: 1,
      commentsOnImageQuality: "",
    },
    overallAssessment: {
      overallQuality: 1,
      generalComments: "",
    },
    feedbackToRadiologist: "",
    complianceAndStandardization: {
      adherenceToGuidelines: true,
      commentsOnCompliance: "",
    },
    additionalReviewerComments: "",
  };

  //* Define validation schema using Yup
  validationSchema = Yup.object({
    accuracyOfFindings: Yup.object({
      correctnessOfFindings: Yup.boolean().required('Correctness of findings is required'),
      commentsOnAccuracy: Yup.string().required('Comments on accuracy are required'),
      missedFindings: Yup.array().of(
        Yup.object({
          description: Yup.string().required('Missed finding description is required'),
        })
      ).required('Missed findings are required'),
    }),
    clarityAndCompleteness: Yup.object({
      clarityOfLanguage: Yup.number()
        .required('Clarity of language is required')
        .min(1, 'Clarity of language must be at least 1')
        .max(5, 'Clarity of language must be at most 5'),
      commentsOnLanguage: Yup.string().required('Comments on language are required'),
      completenessOfReport: Yup.number()
        .required('Completeness of report is required')
        .min(1, 'Completeness of report must be at least 1')
        .max(5, 'Completeness of report must be at most 5'),
      commentsOnCompleteness: Yup.string().required('Comments on completeness are required'),
    }),
    impressionAndRecommendations: Yup.object({
      accuracyOfImpression: Yup.boolean().required('Accuracy of impression is required'),
      commentsOnImpression: Yup.string().required('Comments on impression are required'),
      appropriatenessOfRecommendations: Yup.number()
        .required('Appropriateness of recommendations is required')
        .min(1, 'Appropriateness of recommendations must be at least 1')
        .max(5, 'Appropriateness of recommendations must be at most 5'),
      suggestionsForRecommendations: Yup.string().required('Suggestions for recommendations are required'),
    }),
    technicalQuality: Yup.object({
      imagingTechnique: Yup.number()
        .required('Imaging technique is required')
        .min(1, 'Imaging technique must be at least 1')
        .max(5, 'Imaging technique must be at most 5'),
      commentsOnTechnique: Yup.string().required('Comments on technique are required'),
      imageQuality: Yup.number()
        .required('Image quality is required')
        .min(1, 'Image quality must be at least 1')
        .max(5, 'Image quality must be at most 5'),
      commentsOnImageQuality: Yup.string().required('Comments on image quality are required'),
    }),
    overallAssessment: Yup.object({
      overallQuality: Yup.number()
        .required('Overall quality is required')
        .min(1, 'Overall quality must be at least 1')
        .max(5, 'Overall quality must be at most 5'),
      generalComments: Yup.string().required('General comments are required'),
    }),
    feedbackToRadiologist: Yup.string().required('Feedback to radiologist is required'),
    complianceAndStandardization: Yup.object({
      adherenceToGuidelines: Yup.boolean().required('Adherence to guidelines is required'),
      commentsOnCompliance: Yup.string().required('Comments on compliance are required'),
    }),
    additionalReviewerComments: Yup.string(),  // No validation required for this field
  });

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  toJson(entity: ReviewDataInterface): any {
    return {
      reportId: entity.reportId,
      feedbackToRadiologist: entity.feedbackToRadiologist,
      additionalReviewerComments: entity.additionalReviewerComments,
      accuracyOfFindings: this.toAccuracyOfFindingsDataJson(entity.accuracyOfFindings),
      clarityAndCompleteness: this.toClarityAndCompletenessDataJson(entity.clarityAndCompleteness),
      impressionAndRecommendations: this.toImpressionAndRecommendationsDataJson(entity.impressionAndRecommendations),
      technicalQuality: this.toTechnicalQualityDataJson(entity.technicalQuality),
      overallAssessment: this.toOverallAssessmentDataJson(entity.overallAssessment),
      complianceAndStandardization: this.toComplianceAndStandardizationDataJson(entity.complianceAndStandardization),
    };
  }

  private toAccuracyOfFindingsDataJson(entity: AccuracyOfFindings): any {
    return {
      commentsOnAccuracy: entity.commentsOnAccuracy,
      correctnessOfFindings: entity.correctnessOfFindings,
      MissedFindings: entity.missedFindings.map((el) => this.toMissedFindingDataJson(el)),
   }
  }

  private toMissedFindingDataJson(entity: MissedFinding): any {
    return {
      description: entity.description,
   }
  }

  private toClarityAndCompletenessDataJson(entity: ClarityAndCompleteness): any {
    return {
      clarityOfLanguage: entity.clarityOfLanguage,
      commentsOnCompleteness: entity.commentsOnCompleteness,
      commentsOnLanguage: entity.commentsOnLanguage,
      completenessOfReport: entity.completenessOfReport,
   }
  }

  private toImpressionAndRecommendationsDataJson(entity: ImpressionAndRecommendations): any {
    return {
      accuracyOfImpression: entity.accuracyOfImpression,
      commentsOnImpression: entity.commentsOnImpression,
      appropriatenessOfRecommendations: entity.appropriatenessOfRecommendations,
      suggestionsForRecommendations: entity.suggestionsForRecommendations,
   }
  }

  private toTechnicalQualityDataJson(entity: TechnicalQuality): any {
    return {
      imageQuality: entity.imageQuality,
      imagingTechnique: entity.imagingTechnique,
      commentsOnImageQuality: entity.commentsOnImageQuality,
      commentsOnTechnique: entity.commentsOnTechnique,
   }
  }

  private toOverallAssessmentDataJson(entity: OverallAssessment): any {
    return {
      generalComments: entity.generalComments,
      overallQuality: entity.overallQuality,
   }
  }

  private toComplianceAndStandardizationDataJson(entity: ComplianceAndStandardization): any {
    return {
      adherenceToGuidelines: entity.adherenceToGuidelines,
      commentsOnCompliance: entity.commentsOnCompliance,
   }
  }


  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  fromJson(json: any): ReviewDataInterface {
    return {
      id: json.id,
      feedbackToRadiologist: json.feedbackToRadiologist,
      additionalReviewerComments: json.additionalReviewerComments,
      accuracyOfFindings: this.fromAccuracyOfFindingsDataJson(json.accuracyOfFindings) ,
      clarityAndCompleteness : this.fromClarityAndCompletenessDataJson(json.clarityAndCompleteness),
      impressionAndRecommendations : this.fromImpressionAndRecommendationsDataJson(json.impressionAndRecommendations),
      technicalQuality : this.fromTechnicalQualityDataJson(json.technicalQuality),
      overallAssessment : this.fromOverallAssessmentDataJson(json.overallAssessment),
      complianceAndStandardization : this.fromComplianceAndStandardizationDataJson(json.complianceAndStandardization),
    };
  }

  private fromAccuracyOfFindingsDataJson(json: any): AccuracyOfFindings {
    return {
      id: json.id,
      commentsOnAccuracy: json.commentsOnAccuracy,
      correctnessOfFindings: json.correctnessOfFindings,
      missedFindings: json.missedFindings ? json?.missedFindings?.map((el : MissedFinding ) => this.fromMissedFindingDataJson(el)) : [],
   }
  }

  private fromMissedFindingDataJson(json: any ): MissedFinding {
    return {
      id: json.id,
      description: json.description,
   }
  }

  private fromClarityAndCompletenessDataJson(json: any ): ClarityAndCompleteness {
    return {
      id: json.id,
      clarityOfLanguage: json.clarityOfLanguage,
      commentsOnCompleteness: json.commentsOnCompleteness,
      commentsOnLanguage: json.commentsOnLanguage,
      completenessOfReport: json.completenessOfReport,
   }
  }

  private fromImpressionAndRecommendationsDataJson(json: any ): ImpressionAndRecommendations {
    return {
      id: json.id,
      accuracyOfImpression: json.accuracyOfImpression,
      appropriatenessOfRecommendations: json.appropriatenessOfRecommendations,
      commentsOnImpression: json.commentsOnImpression,
      suggestionsForRecommendations: json.suggestionsForRecommendations,
   }
  }

  private fromTechnicalQualityDataJson(json: any ): TechnicalQuality {
    return {
      id: json.id,
      commentsOnImageQuality: json.commentsOnImageQuality,
      commentsOnTechnique: json.commentsOnTechnique,
      imageQuality: json.imageQuality,
      imagingTechnique: json.imagingTechnique,
   }
  }

  private fromOverallAssessmentDataJson(json: any ): OverallAssessment {
    return {
      id: json.id,
      generalComments: json.generalComments,
      overallQuality: json.overallQuality,
   }
  }

  private fromComplianceAndStandardizationDataJson(json: any ): ComplianceAndStandardization {
    return {
      id: json.id,
      adherenceToGuidelines: json.adherenceToGuidelines,
      commentsOnCompliance: json.commentsOnCompliance,
   }
  }
}

const reviewDataModel = new ReviewDataModel();
export default reviewDataModel;
