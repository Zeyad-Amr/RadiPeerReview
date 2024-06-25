import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { Specialization } from "@/core/shared/constants/enums";
import { useAppDispatch } from "@/core/state/store";
import {
  createRadiologist,
  updateRadiologist,
} from "@/modules/radiologists/controllers/thunks/radiologist-thunk";
import { RadiologistInterface } from "@/modules/radiologists/interfaces/radiologist-interface";
import radiologistModel from "@/modules/radiologists/models/radiologist-model";
import RadiologistModel from "@/modules/radiologists/models/radiologist-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React, { Dispatch, SetStateAction } from "react";

const RadiologistForm = ({
  id,
  initialValues,
  isViewMode,
  setShowFormDialog,
}: {
  isViewMode: boolean;
  id?: string;
  visitCode?: string;
  initialValues: any;
  setShowFormDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const specializationList = Object.values(Specialization).map(
    (specialization) => ({
      value: specialization
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()), // Format label as "Neuroradiology"
      id: specialization,
    })
  );

  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={
        initialValues
          ? ({
              ...initialValues,
            } as RadiologistInterface)
          : RadiologistModel.defaultValues
      }
      onSubmit={async (values) => {
        const action = initialValues
          ? updateRadiologist({
              id: id,
              email: values.email,
              fname: values.fname,
              lname: values.lname,
              phone: values.phone,
              specializations: values.specializations,
            })
          : createRadiologist(values);

        dispatch(action).then((res) => {
          if (res?.meta.requestStatus == "fulfilled") {
            setShowFormDialog(false);
          }
        });
      }}
      validationSchema={
        initialValues
          ? radiologistModel.editValidationSchema
          : radiologistModel.validationSchema
      }
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
            {initialValues ? null : (
              <>
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
              </>
            )}
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
