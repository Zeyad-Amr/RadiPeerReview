import CustomSelectField from '@/core/shared/components/CustomSelectField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { RootState, useAppDispatch, useAppSelector } from '@/core/state/store';
import { getRadiologistList } from '@/modules/admin/controllers/thunks/radiologist-thunk';
import { RadiologistState } from '@/modules/admin/controllers/types';
import { RadiologistInterface } from '@/modules/admin/interfaces/radiologist-interface';
import { AssignReviewRequest } from '@/modules/review-request/controllers/thunks/review-request-thunk';
import { Box, Grid } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react'

const AssignReview = ({ id }: { id: string }) => {

    // get all radiologists //
    function formatRadiologists(radiologists: RadiologistInterface[]) {
        return radiologists.map((radiologist: RadiologistInterface, index: number) => {
            return {
                id: radiologist.id,
                value: `${radiologist.fname} ${radiologist.lname}`
            };
        });
    }

    const radiologistState: RadiologistState = useAppSelector(
        (state: RootState) => state.radiologists
    )

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRadiologistList());
    }, [])


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
                                options={formatRadiologists(radiologistState.radiologists)}
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