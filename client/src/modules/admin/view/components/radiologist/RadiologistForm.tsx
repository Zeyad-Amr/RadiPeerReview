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
    id,
    initialValues,
    isViewMode,
    setShowFormDialog,
}: ExaminationFormComponentPropsInterface) => {

    const specializations = [
        { id: 0, value: "NEURORADIOLOGY" },
        { id: 1, value: "MUSCULOSKELETAL_RADIOLOGY" },
        { id: 2, value: "ABDOMINAL_RADIOLOGY" },
        { id: 3, value: "CARDIOVASCULAR_RADIOLOGY" },
        { id: 4, value: "BREAST_IMAGING" },
        { id: 5, value: "PEDIATRIC_RADIOLOGY" },
        { id: 6, value: "THORACIC_RADIOLOGY" },
        { id: 7, value: "GENITOURINARY_RADIOLOGY" },
        { id: 8, value: "INTERVENTIONAL_RADIOLOGY" },
        { id: 9, value: "NUCLEAR_MEDICINE" },
        { id: 10, value: "EMERGENCY_RADIOLOGY" },
        { id: 11, value: "ONCOLOGIC_IMAGING" },
        { id: 12, value: "GASTROINTESTINAL_RADIOLOGY" },
        { id: 13, value: "HEAD_AND_NECK_RADIOLOGY" },
        { id: 14, value: "ORTHOPEDIC_RADIOLOGY" },
        { id: 15, value: "VASCULAR_AND_INTERVENTIONAL_RADIOLOGY" },
        { id: 16, value: "ENDOVASCULAR_SURGICAL_NEURORADIOLOGY" },
        { id: 17, value: "BODY_IMAGING" }
    ];

    function formatSpecializations(specializations: { id: number, value: string }[]) {
        return specializations.map(spec => {
            // Convert the value to "Abc Xyz" format
            const formattedValue = spec.value
                .toLowerCase() // Convert to lowercase
                .split('_') // Split by underscore
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
                .join(' '); // Join words with space

            return {
                id: spec.id,
                value: formattedValue
            };
        });
    }

    function getSpecializationsByIds(ids: string[]): string[] {
        return ids.map(id => {
            const specialization = specializations.find(spec => Number(spec.id) === Number(id));
            return specialization ? specialization.value : null;
        }).filter((value): value is string => value !== null);
    }

    const dispatch = useAppDispatch();
    return (
        <Formik
            initialValues={RadiologistModel.defaultValues()}
            onSubmit={async (values) => {
                console.log(getSpecializationsByIds(values.specializations));
                const submitObject = {
                    ...values,
                    id: id,
                    specializations: getSpecializationsByIds(values.specializations)
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
                                options={formatSpecializations(specializations)}
                                name="specializations"
                                label=""
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
