import CustomSelectField from '@/core/shared/components/CustomSelectField';
import CustomTextField from '@/core/shared/components/CustomTextField';
import PrimaryButton from '@/core/shared/components/btns/PrimaryButton';
import { updateRadiologist, createRadiologist } from '@/modules/admin/controllers/thunks/radiologist-thunk';
import { RadiologistInterface } from '@/modules/admin/interfaces/radiologist-interface';
import RadiologistModel from '@/modules/admin/models/radiologist-model';
import { Box, Grid } from '@mui/material';
import { Formik } from 'formik';
import React from 'react'

const AssignReview = () => {
    return (
        <Formik
            initialValues={{ reviewer: { id: 0, name: '' } }}
            onSubmit={(values) => console.log(values)}
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
                    <Grid container spacing={1} sx={{ alignItems: 'center',justifyContent:'center' }}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <CustomSelectField
                                options={[
                                    {
                                        id: 0,
                                        value: "Body"
                                    },
                                    {
                                        id: 1,
                                        value: "Zeyad"
                                    },
                                    {
                                        id: 2,
                                        value: "Raouf"
                                    },
                                ]}
                                height='2rem'
                                name="reviewer"
                                label=""
                                placeholder="reviewer"
                                value={values.reviewer}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.reviewer}
                                touched={touched.reviewer}
                                width="100%"
                                sx={{mb:0}}

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