import { Box } from '@mui/system'
import React from 'react'
import ReviewTag from './ReviewTag'
import PageTitle from '@/core/shared/components/PageTitle'
import { Typography } from '@mui/material'
import ReviewResultHeader from './ReviewResultHeader'
import ReviewResultRow from './ReviewResultRow'
import ErrorsRow from './ErrorsRow'
import Br from './Br'
import ReviewResultFooter from './ReviewResultFooter'

const data = {
  id: 1,
  accuracyOfFindings: {
    correctnessOfFindings: false,
    commentsOnAccuracy: "The findings were not accurately described.",
    missedFindings: [
      {
        id: 1,
        description: "Small lesion in the lower left lobe was missed."
      },
      {
        id: 2,
        description: "Presence of fluid collection in the abdomen was not mentioned."
      }
    ]
  },
  clarityAndCompleteness: {
    clarityOfLanguage: 4,
    commentsOnLanguage: "The language used was clear and easy to understand.",
    completenessOfReport: 3,
    commentsOnCompleteness: "Some additional details could have been included for better clarity."
  },
  impressionAndRecommendations: {
    accuracyOfImpression: true,
    commentsOnImpression: "The diagnostic impression was accurate.",
    appropriatenessOfRecommendations: 4,
    suggestionsForRecommendations: "Consider providing more detailed recommendations for follow-up."
  },
  technicalQuality: {
    imagingTechnique: 5,
    commentsOnTechnique: "The imaging technique used was appropriate for the diagnosis.",
    imageQuality: 4,
    commentsOnImageQuality: "The image quality was generally good, but some areas could be clearer."
  },
  overallAssessment: {
    overallQuality: 4,
    generalComments: "Overall, the report was well-written and informative."
  },
  complianceAndStandardization: {
    adherenceToGuidelines: true,
    commentsOnCompliance: "The report adhered to standard reporting guidelines."
  },
  feedbackToRadiologist: "Excellent job on describing the findings accurately. Consider providing more comprehensive recommendations in future reports.",
  additionalReviewerComments: "The radiologist should pay closer attention to small lesions and mention all relevant findings in the report."
}


const ReviewResult = () => {
  return (
    <Box sx={{ width: '100%', aspectRatio: '210 / 297', backgroundColor: 'white', padding: '2rem', boxSizing: 'border-box' }}>
      {/* <ReviewTag text={5} type='score' />
      <ReviewTag text={3} type='score' />
      <ReviewTag text={1} type='score' />
      <ReviewTag text='test' type='result' variant='success' />
      <ReviewTag text='test' type='result' variant='fail' />
      <ReviewTag text='test' type='result' variant='warning' />
      <ReviewTag text='test' type='result' variant='natural' /> */}
      <ReviewResultHeader comment={data.overallAssessment.generalComments} reportName='Mtdshml Report' result={data.overallAssessment.overallQuality} />
      <ReviewResultRow
        title='Accuracy Of Findings'
        comment={data.accuracyOfFindings.commentsOnAccuracy}
        tag={<ReviewTag text={data.accuracyOfFindings.correctnessOfFindings ? 'Succeeded' : 'Failed'} type='result' variant={data.accuracyOfFindings.correctnessOfFindings ? 'success' : 'fail'} />}
      />
      <ErrorsRow messages={data.accuracyOfFindings.missedFindings} title='Missed Findings' />
      <Br />
      <ReviewResultRow
        title='Clarity Of Language'
        tag={<ReviewTag text={data.clarityAndCompleteness.clarityOfLanguage} type='score' />}
        comment={data.clarityAndCompleteness.commentsOnLanguage}
      />
      <ReviewResultRow
        sx={{ mt: 2 }}
        title='Completeness Of Report'
        tag={<ReviewTag text={data.clarityAndCompleteness.completenessOfReport} type='score' />}
        comment={data.clarityAndCompleteness.commentsOnCompleteness}
      />
      <Br />
      <ReviewResultRow
        title='Accuracy Of Impression'
        tag={<ReviewTag text={data.impressionAndRecommendations.accuracyOfImpression ? 'Succeeded' : 'Failed'} type='result' variant={data.impressionAndRecommendations.accuracyOfImpression ? 'success' : 'fail'} />}
        comment={data.impressionAndRecommendations.commentsOnImpression}
      />
      <ReviewResultRow
        sx={{ mt: 2 }}
        title='Completeness Of Report'
        tag={<ReviewTag text={data.impressionAndRecommendations.appropriatenessOfRecommendations} type='score' />}
        comment={data.impressionAndRecommendations.suggestionsForRecommendations}
        suggestion
      />
      <Br />
      <ReviewResultRow
        title='Imaging Technique'
        tag={<ReviewTag text={data.technicalQuality.imagingTechnique} type='score' />}
        comment={data.technicalQuality.commentsOnTechnique}
      />
      <ReviewResultRow
        sx={{ mt: 2 }}
        title='Completeness Of Report'
        tag={<ReviewTag text={data.technicalQuality.imageQuality} type='score' />}
        comment={data.technicalQuality.commentsOnImageQuality}
      />
      <Br />
      <ReviewResultRow
        title='Compliance And Standardization'
        tag={<ReviewTag text={data.complianceAndStandardization.adherenceToGuidelines ? 'Succeeded' : 'Failed'} type='result' variant={data.complianceAndStandardization.adherenceToGuidelines ? 'success' : 'fail'} />}
        comment={data.complianceAndStandardization.commentsOnCompliance}
      />
      <Br />
      <ReviewResultFooter comment={data.additionalReviewerComments} feedback={data.feedbackToRadiologist} />
    </Box>
  )
}

export default ReviewResult