export interface ReviewDataInterface {
  id?: number | string;
  reportId?: number | string;
  accuracyOfFindings: AccuracyOfFindings;
  clarityAndCompleteness: ClarityAndCompleteness;
  impressionAndRecommendations: ImpressionAndRecommendations;
  technicalQuality: TechnicalQuality;
  overallAssessment: OverallAssessment;
  feedbackToRadiologist: string;
  complianceAndStandardization: ComplianceAndStandardization;
  additionalReviewerComments: string;
}

export interface MissedFinding {
  id?: number | string;
  description: string;
}

export interface AccuracyOfFindings {
  id?: number | string;
  correctnessOfFindings: boolean;
  commentsOnAccuracy: string;
  missedFindings: MissedFinding[];
}

export interface ClarityAndCompleteness {
  id?: number | string;
  clarityOfLanguage: number;
  commentsOnLanguage: string;
  completenessOfReport: number;
  commentsOnCompleteness: string;
}

export interface ImpressionAndRecommendations {
  id?: number | string;
  accuracyOfImpression: boolean;
  commentsOnImpression: string;
  appropriatenessOfRecommendations: number;
  suggestionsForRecommendations: string;
}

export interface TechnicalQuality {
  id?: number | string;
  imagingTechnique: number;
  commentsOnTechnique: string;
  imageQuality: number;
  commentsOnImageQuality: string;
}

export interface OverallAssessment {
  id?: number | string;
  overallQuality: number;
  generalComments: string;
}

export interface ComplianceAndStandardization {
  id?: number | string;
  adherenceToGuidelines: boolean;
  commentsOnCompliance: string;
}
