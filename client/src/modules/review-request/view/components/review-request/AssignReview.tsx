import CustomSelectField from '@/core/shared/components/CustomSelectField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { RootState, useAppDispatch, useAppSelector } from '@/core/state/store';

import { getAllUsers } from '@/modules/auth/controllers/thunks/auth-thunk';
import { allUsersState } from '@/modules/auth/controllers/types';
import { UserInterface } from '@/modules/auth/interfaces/user-interface';
import { AssignReviewRequest } from '@/modules/review-request/controllers/thunks/review-request-thunk';
import { ReviewRequestState } from '@/modules/review-request/controllers/types';
import { Box, Grid } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'

const AssignReview = ({ id, users }: { id: string, users: { id: string, value: string }[] }) => {


    const dispatch = useAppDispatch();



    return (
        <Formik
            initialValues={{ reviewer: '' }}
            onSubmit={async (values) => {
                const action = AssignReviewRequest({ reviewerId: values.reviewer, id })
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
                    <Grid container spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <CustomSelectField
                                options={users}
                                height='2rem'
                                name="reviewer"
                                label=""
                                value={values.reviewer}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.reviewer}
                                touched={touched.reviewer}
                                width="100%"
                                sx={{ mb: 0 }}

                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <PrimaryButton
                                title="Save"
                                type="submit"
                                sx={{ height: '2rem' }}
                            />
                        </Grid>

                    </Grid>
                </Box>
            )}
        </Formik>
    )
}

export default AssignReview