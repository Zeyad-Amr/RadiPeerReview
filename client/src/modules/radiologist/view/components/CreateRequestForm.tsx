import { Box, Button, Grid, Typography } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { DoneRounded } from "@mui/icons-material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import * as Yup from "yup";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { ReportInterface } from "../../interfaces/report-interface";
import reportModel from "../../models/report-model";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";

interface CreateRequestFormPropsInterface {
  setShowFormDialog: Dispatch<SetStateAction<boolean>>;
}

const CreateRequestForm = ({
  setShowFormDialog,
}: CreateRequestFormPropsInterface) => {
  const pdfFileInputRef = useRef<HTMLInputElement>(null);
  const dicomFileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    values: ReportInterface,
    { resetForm }: FormikHelpers<ReportInterface>
  ) => {
    console.log(values);
    // dispatch create report
    resetForm();
    setShowFormDialog(false);
  };

  return (
    <Formik
      initialValues={reportModel.defaultValues}
      onSubmit={handleSubmit}
      validationSchema={reportModel.validationSchema}
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
          {/* PDF File Upload Box */}
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box
                sx={{
                  width: "100%",
                  height: "3rem",
                  borderRadius: "5px",
                  backgroundColor: "secondary.main",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  boxSizing: "border-box",
                  border: "0.1px solid #ffffff50",
                  marginBottom: "0.3rem",
                }}
                onClick={() => pdfFileInputRef.current?.click()}
              >
                <Typography sx={{ color: "white" }}>
                  {values.pdfFile
                    ? (values.pdfFile as File).name
                    : "Upload PDF File"}
                </Typography>
                {values.pdfFile ? (
                  <DoneRounded sx={{ color: "#29f19c" }} />
                ) : (
                  <FileUploadRoundedIcon sx={{ color: "white" }} />
                )}
              </Box>

              {/* Hidden PDF file input */}
              <input
                type="file"
                onChange={(event) => {
                  setFieldValue("pdfFile", event.currentTarget.files?.[0]);
                }}
                ref={pdfFileInputRef}
                style={{ display: "none" }}
                accept=".pdf"
              />

              {/* PDF file validation error message */}
              {errors.pdfFile && (
                <Typography
                  sx={{
                    color: "#FF5630",
                    fontSize: "12px",
                    margin: "0.4rem 0rem 0rem 0.3rem",
                  }}
                >
                  {errors.pdfFile}
                </Typography>
              )}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {/* DICOM File Upload Box */}
              <Box
                sx={{
                  width: "100%",
                  height: "3rem",
                  borderRadius: "5px",
                  backgroundColor: "secondary.main",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem",
                  boxSizing: "border-box",
                  border: "0.1px solid #ffffff50",
                  marginBottom: "0.3rem",
                }}
                onClick={() => dicomFileInputRef.current?.click()}
              >
                <Typography sx={{ color: "white" }}>
                  {values.dicomFile
                    ? (values.dicomFile as File).name
                    : "Upload DICOM File"}
                </Typography>
                {values.dicomFile ? (
                  <DoneRounded sx={{ color: "#29f19c" }} />
                ) : (
                  <FileUploadRoundedIcon sx={{ color: "white" }} />
                )}
              </Box>

              {/* Hidden DICOM file input */}
              <input
                type="file"
                onChange={(event) => {
                  setFieldValue("dicomFile", event.currentTarget.files?.[0]);
                }}
                ref={dicomFileInputRef}
                style={{ display: "none" }}
                accept=".dcm"
              />

              {/* DICOM file validation error message */}
              {errors.dicomFile && (
                <Typography
                  sx={{
                    color: "#FF5630",
                    fontSize: "12px",
                    margin: "0.4rem 0rem 0rem 0.3rem",
                  }}
                >
                  {errors.dicomFile}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {/* Additional Comments */}
              <Box>
                <CustomTextField
                  name="additionalComments"
                  label="Comments"
                  value={values.additionalComments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.additionalComments}
                  touched={touched.additionalComments}
                  width="100%"
                  props={{
                    type: "text",
                  }}
                  multiline
                  rows={2}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ display : "flex" , justifyContent : "flex-end" }}>
            <PrimaryButton title="Add" type="submit" />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CreateRequestForm;