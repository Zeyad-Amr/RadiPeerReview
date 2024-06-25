import CustomSelectField from "@/core/shared/components/CustomSelectField";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch } from "@/core/state/store";
import { AssignReviewRequest } from "@/modules/review-requests/controllers/thunks/request-thunk";
import { Box } from "@mui/material";
import { Formik } from "formik";
import React from "react";

const AssignReview = ({
  id,
  users,
}: {
  id: string;
  users: { id: string; value: string }[];
}) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ reviewer: "" }}
      onSubmit={async (values) => {
        const action = AssignReviewRequest({ reviewerId: values.reviewer, id });
        dispatch(action);
        //  reset form
        values.reviewer = "";
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CustomSelectField
            options={users}
            height="2rem"
            name="reviewer"
            label=""
            value={values.reviewer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.reviewer}
            touched={touched.reviewer}
            sx={{
              width: "12rem",
            }}
          />

          <PrimaryButton
            title="Save"
            type="submit"
            sx={{ height: "2rem", width: "2.5rem" }}
          />
        </Box>
      )}
    </Formik>
  );
};

export default AssignReview;
