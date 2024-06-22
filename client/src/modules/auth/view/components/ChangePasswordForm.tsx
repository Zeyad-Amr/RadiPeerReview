import CustomTextField from '@/core/shared/components/CustomTextField';
import React from 'react'
import { Formik } from "formik";
import { ChangePasswordInterface } from '../../interfaces/change-password-interface';
import changePasswordModel from '../../models/change-password-model';
import { Box } from '@mui/material';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';

const ChangePasswordForm = () => {
    return (
        <Formik
            initialValues={changePasswordModel.defaultValues}
            validationSchema={changePasswordModel.validationSchema}
            onSubmit={(values: ChangePasswordInterface) => {
                console.log(values);
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
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <CustomTextField
                        isRequired
                        name="oldPassword"
                        label="Old Password"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.oldPassword}
                        touched={touched.oldPassword}
                        width="100%"
                        props={{
                            type: "text",
                        }}
                    />
                    <CustomTextField
                        isRequired
                        name="newPassword"
                        label="New Password"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.newPassword}
                        touched={touched.newPassword}
                        width="100%"
                        props={{
                            type: "password",
                        }}
                    />
                    <PrimaryButton
                        type="submit"
                        title='Save'
                    />

                </Box>
            )}
        </Formik>
    )
}

export default ChangePasswordForm