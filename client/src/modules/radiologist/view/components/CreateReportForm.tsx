import { Box, Button, Typography } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import React, { useRef } from "react";
import { DoneRounded } from "@mui/icons-material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import * as Yup from "yup";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { ReportInterface } from "../../interfaces/report-interface";
import reportModel from "../../models/report-model";

const CreateReportForm: React.FC = () => {
  const pdfFileInputRef = useRef<HTMLInputElement>(null);
  const dicomFileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    values: ReportInterface,
    { resetForm }: FormikHelpers<ReportInterface>
  ) => {
    console.log(values);
    // dispatch create report
    resetForm();
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
          <Box
            sx={{
              width: "100%",
              height: "3rem",
              borderRadius: "5px",
              backgroundColor: "rgb(32, 37, 45)",
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
              }}
              variant="body2"
            >
              {errors.pdfFile}
            </Typography>
          )}

          {/* DICOM File Upload Box */}
          <Box
            sx={{
              width: "100%",
              height: "3rem",
              borderRadius: "5px",
              backgroundColor: "rgb(32, 37, 45)",
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
              }}
              variant="body2"
            >
              {errors.dicomFile}
            </Typography>
          )}

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

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            sx={{
              marginTop: "1rem",
              background: "linear-gradient(90deg, #29f19c, #02a1f9)",
            }}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CreateReportForm;
