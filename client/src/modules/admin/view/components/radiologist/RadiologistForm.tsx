import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Specialization } from "@/core/shared/constants/enums";
import { useAppDispatch } from "@/core/state/store";
import {
  createRadiologist,
  updateRadiologist,
} from "@/modules/admin/controllers/thunks/radiologist-thunk";
import { RadiologistInterface } from "@/modules/admin/interfaces/radiologist-interface";
import radiologistModel from "@/modules/admin/models/radiologist-model";
import RadiologistModel from "@/modules/admin/models/radiologist-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";

const RadiologistForm = ({
  id,
  initialValues,
  isViewMode,
  setShowFormDialog,
}: ExaminationFormComponentPropsInterface) => {
  const specializationList = Object.values(Specialization).map(
    (specialization) => ({
      value: specialization
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()), // Format label as "Neuroradiology"
      id: specialization,
    })
  );

  function formatSpecializations(
    specializations: { id: number; value: string }[]
  ) {
    return specializations.map((spec) => {
      // Convert the value to "Abc Xyz" format
      const formattedValue = spec.value
        .toLowerCase() // Convert to lowercase
        .split("_") // Split by underscore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(" "); // Join words with space

      return {
        id: spec.id,
        value: formattedValue,
      };
    });
  }

  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={RadiologistModel.defaultValues}
      onSubmit={async (values) => {
        console.log("values", values);

        const action = initialValues
          ? updateRadiologist(values)
          : createRadiologist(values);

        dispatch(action).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
            setShowFormDialog(false);
          }
        });
      }}
      validationSchema={radiologistModel.validationSchema}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                isRequired
                name="fname"
                label="First Name"
                value={values.fname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fname}
                touched={touched.fname}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                name="lname"
                label="Last Name"
                value={values.lname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.lname}
                touched={touched.lname}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomSelectField
                options={specializationList}
                name="specializations"
                label="Specializations"
                value={values.specializations}
                onChange={handleChange}
                onBlur={handleBlur}
                // error={errors.specializations}
                touched={touched.specializations}
                width="100%"
                multiple
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomTextField
                name="phone"
                label="Phone Number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                name="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
                touched={touched.username}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                width="100%"
                props={{
                  type: "text",
                  disabled: isViewMode,
                }}
              />
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {!isViewMode ? (
                <PrimaryButton
                  title={initialValues ? "Save" : "Add"}
                  type="submit"
                />
              ) : null}
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  );
};

export default RadiologistForm;