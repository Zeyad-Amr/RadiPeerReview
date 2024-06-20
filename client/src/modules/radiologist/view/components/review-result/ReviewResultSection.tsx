import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

const ReviewResultSection = ({ children }: { children: ReactNode }) => {
    return (
        <Box>
            {children}
        </Box>
    )
}

export default ReviewResultSection