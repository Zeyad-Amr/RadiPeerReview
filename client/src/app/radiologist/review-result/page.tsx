"use client"

import RadiologistLayout from '@/core/layout/radiologist/RadiologistLayout'
import ReviewResult from '@/modules/radiologist/view/components/review-result/ReviewResult'
import { Box } from '@mui/system'
import React from 'react'

const ReviewResultTest = () => {
    return (
        <RadiologistLayout>
            <Box sx={{ width: '50vw', margin:'0 auto' }}>
                <ReviewResult />
            </Box>
        </RadiologistLayout>

    )
}

export default ReviewResultTest