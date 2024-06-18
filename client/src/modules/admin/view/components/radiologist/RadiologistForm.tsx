import CustomSelectField from "@/core/shared/components/CustomSelectField";
import CustomTextField from "@/core/shared/components/CustomTextField";
import { ExaminationFormComponentPropsInterface } from "@/core/shared/components/ExaminationAccordion";
import PrimaryButton from "@/core/shared/components/btns/PrimaryButton";
import { useAppDispatch } from "@/core/state/store";
import {
    createRadiologist,
    updateRadiologist,
} from "@/modules/admin/controllers/thunks/radiologist-thunk";
import { RadiologistInterface } from "@/modules/admin/interfaces/radiologist-interface";
import RadiologistModel from "@/modules/admin/models/radiologist-model";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";

const RadiologistForm = ({
    patientId,
    initialValues,
    isViewMode,
    setShowFormDialog,
}: ExaminationFormComponentPropsInterface) => {
    const dispatch = useAppDispatch();
    return (
        <Formik
            initialValues={
                initialValues
                    ? ({
                        ...initialValues,
                        endDate: initialValues?.endDate?.split("T")[0],
                        beginDate: initialValues?.beginDate?.split("T")[0],
                    } as RadiologistInterface)
                    : RadiologistModel.defaultValues()
            }
            onSubmit={async (values) => {
                const submitObject = {
                    ...values,
                    patientId: patientId,
                };

                const action = initialValues
                    ? updateRadiologist(submitObject)
                    : createRadiologist(submitObject);

                dispatch(action).then((res) => {
                    if (res?.meta.requestStatus == "fulfilled") {
                        setShowFormDialog(false);
                    }
                });
            }}
            validationSchema={RadiologistModel.radiologistFormValidations()}
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
                                options={[
                                    {
                                        id: 0,
                                        value: "X-ray"
                                    },
                                    {
                                        id: 1,
                                        value: "CT"
                                    },
                                    {
                                        id: 2,
                                        value: "MRI"
                                    },
                                ]}
                                name="specialization"
                                label=""
                                placeholder="specialization"
                                value={values.specialization}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.specialization}
                                touched={touched.specialization}
                                width="100%"

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
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
