import CustomSelectField from '@/core/shared/components/CustomSelectField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { RootState, useAppDispatch, useAppSelector } from '@/core/state/store';
import { RadiologistState } from '@/modules/admin/controllers/types';
import { RadiologistInterface } from '@/modules/admin/interfaces/radiologist-interface';
import { UserInterface } from '@/modules/auth/interfaces/user-interface';
import { AssignReviewRequest, getRadiologists } from '@/modules/review-request/controllers/thunks/review-request-thunk';
import { ReviewRequestState } from '@/modules/review-request/controllers/types';
import { Box, Grid } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'

const AssignReview = ({ id }: { id: string }) => {

    const allRadiologistsState: ReviewRequestState = useAppSelector(
        (state: RootState) => state.reviewRequestSlice
    )

    // get all radiologists //
    function formatRadiologists(users: UserInterface[]) {
        return users.map((user: UserInterface) => {
            return {
                id: user.id,
                value: `${user.radiologist?.fname} ${user.radiologist?.lname}`
            };
        });
    }


    const [radiologists, setRadiologists] = useState()
    const dispatch = useAppDispatch();




    useEffect(() => {
            const fetchData = async () => {

                const data = await dispatch(getRadiologists()).unwrap();
                setRadiologists(data)
            }

            fetchData()
        
    }, [dispatch])

    console.log(formatRadiologists(radiologists ?? []))
    return (
        <Formik
            initialValues={{ reviewer: '' }}
            onSubmit={async (values) => {
                const action = AssignReviewRequest({ reviewerId: values.reviewer, id })
                console.log(values.reviewer)
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
                                options={formatRadiologists(radiologists ?? [])}
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