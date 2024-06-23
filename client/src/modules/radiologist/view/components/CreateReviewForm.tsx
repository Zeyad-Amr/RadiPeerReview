"use-client";

import React, { Dispatch, SetStateAction } from "react";
import { Formik, FieldArray } from "formik";
import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { Grid, Button, Box, Typography } from "@mui/material";
import reviewDataModel from "../../models/review-model";
import {
  MissedFinding,
  ReviewDataInterface,
} from "../../interfaces/review-interface";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import CustomSeparator from "@/core/shared/components/CustomSeparator";
import CustomRadioButton from "@/core/shared/components/CustomRadioButton";
import { useAppDispatch } from "@/core/state/store";
import { createReview } from "../../controllers/thunks/review-thunk";

interface CreateReviewFormPropsInterface {
  reportId: string | number;
  setRightSectionFlag: Dispatch<
    SetStateAction<"report-details" | "review-details" | "create-review">
  >;
}

// The form component
const CreateReviewForm = ({
  reportId,
  setRightSectionFlag,
}: CreateReviewFormPropsInterface) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={reviewDataModel.defaultValues}
      validationSchema={reviewDataModel.validationSchema}
      onSubmit={(values: ReviewDataInterface, { resetForm }) => {
        console.log(values, "values");
        const submitObject = { ...values, reportId: reportId };
        dispatch(createReview(submitObject)).then((res) => {
          if (res.meta.requestStatus == "fulfilled") {
            resetForm();
            setRightSectionFlag("report-details");
          }
        });
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Typography
            variant="h4"
            sx={{ margin: "0.5rem 0rem 2rem 0rem", color: "primary.light" }}
          >
            Create Review
          </Typography>
          {/* Clarity and Completeness */}
          <Typography variant="h6" sx={{ margin: "1rem 0rem" }}>
            Clarity and Completeness
          </Typography>
          <CustomSeparator
            separatorWidth="8rem"
            separatorColor="primary.light"
            sx={{ marginBottom: "1.8rem" }}
          />
          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="clarityAndCompleteness.completenessOfReport"
                label="Completeness of Report"
                value={values.clarityAndCompleteness.completenessOfReport}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.clarityAndCompleteness?.completenessOfReport}
                touched={touched.clarityAndCompleteness?.completenessOfReport}
                options={[
                  { id: 1, value: "1" },
                  { id: 2, value: "2" },
                  { id: 3, value: "3" },
                  { id: 4, value: "4" },
                  { id: 5, value: "5" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="clarityAndCompleteness.commentsOnCompleteness"
                label="Comments on Completeness"
                value={values.clarityAndCompleteness.commentsOnCompleteness}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.clarityAndCompleteness?.commentsOnCompleteness}
                touched={touched.clarityAndCompleteness?.commentsOnCompleteness}
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="clarityAndCompleteness.clarityOfLanguage"
                label="Clarity of Language"
                value={values.clarityAndCompleteness.clarityOfLanguage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.clarityAndCompleteness?.clarityOfLanguage}
                touched={touched.clarityAndCompleteness?.clarityOfLanguage}
                options={[
                  { id: 1, value: "1" },
                  { id: 2, value: "2" },
                  { id: 3, value: "3" },
                  { id: 4, value: "4" },
                  { id: 5, value: "5" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="clarityAndCompleteness.commentsOnLanguage"
                label="Comments on Language"
                value={values.clarityAndCompleteness.commentsOnLanguage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.clarityAndCompleteness?.commentsOnLanguage}
                touched={touched.clarityAndCompleteness?.commentsOnLanguage}
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          {/* Impression and Recommendations */}
          <Typography variant="h6" sx={{ margin: "1rem 0rem" }}>
            Impression and Recommendations
          </Typography>
          <CustomSeparator
            separatorWidth="9rem"
            separatorColor="primary.light"
            sx={{ marginBottom: "1.8rem", marginTop: "1rem" }}
          />
          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="impressionAndRecommendations.appropriatenessOfRecommendations"
                label="Appropriateness of Recommendations"
                value={
                  values.impressionAndRecommendations
                    .appropriatenessOfRecommendations
                }
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.impressionAndRecommendations
                    ?.appropriatenessOfRecommendations
                }
                touched={
                  touched.impressionAndRecommendations
                    ?.appropriatenessOfRecommendations
                }
                options={[
                  { id: 1, value: "1" },
                  { id: 2, value: "2" },
                  { id: 3, value: "3" },
                  { id: 4, value: "4" },
                  { id: 5, value: "5" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="impressionAndRecommendations.suggestionsForRecommendations"
                label="Suggestions for Recommendations"
                value={
                  values.impressionAndRecommendations
                    .suggestionsForRecommendations
                }
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.impressionAndRecommendations
                    ?.suggestionsForRecommendations
                }
                touched={
                  touched.impressionAndRecommendations
                    ?.suggestionsForRecommendations
                }
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="impressionAndRecommendations.accuracyOfImpression"
                label="Accuracy of Impression"
                value={values.impressionAndRecommendations.accuracyOfImpression}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.impressionAndRecommendations?.accuracyOfImpression
                }
                touched={
                  touched.impressionAndRecommendations?.accuracyOfImpression
                }
                options={[
                  { id: true, value: "Yes" },
                  { id: false, value: "No" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="impressionAndRecommendations.commentsOnImpression"
                label="Comments on Impression"
                value={values.impressionAndRecommendations.commentsOnImpression}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.impressionAndRecommendations?.commentsOnImpression
                }
                touched={
                  touched.impressionAndRecommendations?.commentsOnImpression
                }
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          {/* Technical Quality */}
          <Typography variant="h6" sx={{ margin: "1rem 0rem" }}>
            Technical Quality
          </Typography>
          <CustomSeparator
            separatorWidth="6rem"
            separatorColor="primary.light"
            sx={{ marginBottom: "1.8rem" }}
          />
          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="technicalQuality.imagingTechnique"
                label="Imaging Technique"
                value={values.technicalQuality.imagingTechnique}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.technicalQuality?.imagingTechnique}
                touched={touched.technicalQuality?.imagingTechnique}
                options={[
                  { id: 1, value: "1" },
                  { id: 2, value: "2" },
                  { id: 3, value: "3" },
                  { id: 4, value: "4" },
                  { id: 5, value: "5" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="technicalQuality.commentsOnTechnique"
                label="Comments on Technique"
                value={values.technicalQuality.commentsOnTechnique}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.technicalQuality?.commentsOnTechnique}
                touched={touched.technicalQuality?.commentsOnTechnique}
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="technicalQuality.imageQuality"
                label="Image Quality"
                value={values.technicalQuality.imageQuality}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.technicalQuality?.imageQuality}
                touched={touched.technicalQuality?.imageQuality}
                options={[
                  { id: 1, value: "1" },
                  { id: 2, value: "2" },
                  { id: 3, value: "3" },
                  { id: 4, value: "4" },
                  { id: 5, value: "5" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="technicalQuality.commentsOnImageQuality"
                label="Comments on Image Quality"
                value={values.technicalQuality.commentsOnImageQuality}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.technicalQuality?.commentsOnImageQuality}
                touched={touched.technicalQuality?.commentsOnImageQuality}
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          {/* Overall Assessment */}
          <Typography variant="h6" sx={{ margin: "1rem 0rem" }}>
            Overall Assessment
          </Typography>
          <CustomSeparator
            separatorWidth="8rem"
            separatorColor="primary.light"
            sx={{ marginBottom: "1.8rem" }}
          />
          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="overallAssessment.overallQuality"
                label="Overall Quality"
                value={values.overallAssessment.overallQuality}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.overallAssessment?.overallQuality}
                touched={touched.overallAssessment?.overallQuality}
                options={[
                  { id: 1, value: "1" },
                  { id: 2, value: "2" },
                  { id: 3, value: "3" },
                  { id: 4, value: "4" },
                  { id: 5, value: "5" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="overallAssessment.generalComments"
                label="General Comments"
                value={values.overallAssessment.generalComments}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.overallAssessment?.generalComments}
                touched={touched.overallAssessment?.generalComments}
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          {/* Accuracy of Findings */}
          <Typography variant="h6" sx={{ margin: "1rem 0rem" }}>
            Accuracy of Findings
          </Typography>
          <CustomSeparator
            separatorWidth="8rem"
            separatorColor="primary.light"
            sx={{ marginBottom: "1.8rem" }}
          />
          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="accuracyOfFindings.correctnessOfFindings"
                label="Correctness of Findings"
                value={values.accuracyOfFindings.correctnessOfFindings}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.accuracyOfFindings?.correctnessOfFindings}
                touched={touched.accuracyOfFindings?.correctnessOfFindings}
                options={[
                  { id: true, value: "Yes" },
                  { id: false, value: "No" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="accuracyOfFindings.commentsOnAccuracy"
                label="Comments on Accuracy"
                value={values.accuracyOfFindings.commentsOnAccuracy}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.accuracyOfFindings?.commentsOnAccuracy}
                touched={touched.accuracyOfFindings?.commentsOnAccuracy}
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          <FieldArray name="accuracyOfFindings.missedFindings">
            {({ push, remove }) => (
              <>
                {values.accuracyOfFindings.missedFindings.map(
                  (finding, index) => (
                    <Grid container spacing={1} key={index}>
                      <Grid item lg={11} md={11} sm={11} xs={11}>
                        <CustomTextField
                          isRequired
                          width="100%"
                          name={`accuracyOfFindings.missedFindings[${index}].description`}
                          label={`Missed Finding ${index + 1}`}
                          value={finding.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            (
                              errors.accuracyOfFindings?.missedFindings?.[
                                index
                              ] as MissedFinding
                            )?.description
                          }
                          touched={
                            touched.accuracyOfFindings?.missedFindings?.[index]
                              ?.description
                          }
                          props={{ type: "text" }}
                        />
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "-0.5rem",
                        }}
                        item
                        lg={1}
                        md={1}
                        sm={1}
                        xs={1}
                      >
                        <RemoveCircleOutlineIcon
                          sx={{
                            color: "red",
                            opacity: "0.7",
                            fontSize: "1.8rem",
                            cursor: "pointer",
                          }}
                          onClick={() => remove(index)}
                        />
                      </Grid>
                    </Grid>
                  )
                )}
                <Box
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "secondary.main",
                    borderRadius: "10px",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    height: "2.5rem",
                    margin: "0rem 1rem 0rem 0rem",
                    width: "15rem",
                  }}
                  onClick={() => {
                    push({ description: "" });
                  }}
                >
                  <AddCircleOutlineIcon
                    sx={{ margin: "0rem 0.3rem 0rem 0rem" }}
                  />
                  <Typography>Add Missed Finding</Typography>
                </Box>
              </>
            )}
          </FieldArray>

          {/* Compliance and Standardization */}
          <Typography variant="h6" sx={{ margin: "2rem 0rem 1rem 0rem" }}>
            Compliance and Standardization
          </Typography>
          <CustomSeparator
            separatorWidth="10rem"
            separatorColor="primary.light"
            sx={{ marginBottom: "1.8rem" }}
          />
          <Grid container spacing={0}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <CustomRadioButton
                isRequired
                name="complianceAndStandardization.adherenceToGuidelines"
                label="Adherence to Guidelines"
                value={
                  values.complianceAndStandardization.adherenceToGuidelines
                }
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.complianceAndStandardization?.adherenceToGuidelines
                }
                touched={
                  touched.complianceAndStandardization?.adherenceToGuidelines
                }
                options={[
                  { id: true, value: "Yes" },
                  { id: false, value: "No" },
                ]}
              />
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <CustomTextField
                isRequired
                width="100%"
                name="complianceAndStandardization.commentsOnCompliance"
                label="Comments on Compliance"
                value={values.complianceAndStandardization.commentsOnCompliance}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.complianceAndStandardization?.commentsOnCompliance
                }
                touched={
                  touched.complianceAndStandardization?.commentsOnCompliance
                }
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          {/* Feedback to Radiologist & Additional Reviewer Comments */}
          <Typography variant="h6" sx={{ margin: "1rem 0rem" }}>
            Additional
          </Typography>
          <CustomSeparator
            separatorColor="primary.light"
            sx={{ marginBottom: "1.8rem" }}
          />
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="feedbackToRadiologist"
                label="Feedback to Radiologist"
                value={values.feedbackToRadiologist}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.feedbackToRadiologist}
                touched={touched.feedbackToRadiologist}
                width="100%"
                props={{ type: "text" }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="additionalReviewerComments"
                label="Additional Reviewer Comments"
                value={values.additionalReviewerComments}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.additionalReviewerComments}
                touched={touched.additionalReviewerComments}
                width="100%"
                props={{ type: "text" }}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid container spacing={1}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <PrimaryButton title="Submit" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CreateReviewForm;
