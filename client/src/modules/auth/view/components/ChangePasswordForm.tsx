import CustomTextField from '@/core/shared/components/CustomTextField';
import React from 'react'
import { Formik } from "formik";
import { ChangePasswordInterface } from '../../interfaces/change-password-interface';
import changePasswordModel from '../../models/change-password-model';
import { Box } from '@mui/material';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { changePassoword } from '../../controllers/thunks/change-password-thunk';
import { useAppDispatch } from '@/core/state/store';

const ChangePasswordForm = () => {

    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={changePasswordModel.defaultValues}
            validationSchema={changePasswordModel.validationSchema}
            onSubmit={async (values:ChangePasswordInterface) => {
                const action = changePassoword(values)
                dispatch(action)
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