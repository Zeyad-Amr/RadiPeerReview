import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import AssistantRoundedIcon from '@mui/icons-material/AssistantRounded';
interface ReviewResultRowProps {
    title: string
    tag: ReactNode
    comment: string
    sx?: any
    suggestion?: boolean
}

const ReviewResultRow = ({ title, tag, comment, sx, suggestion = false }: ReviewResultRowProps) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...sx }}>
                <Typography sx={{ fontSize: '.8rem' }}>{title}</Typography>
                {tag}
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                boxSizing: 'border-box',
                backgroundColor: 'primary.lighter',
                borderRadius: '0.5rem',
                mt: 1
            }}>
                {suggestion?<AssistantRoundedIcon sx={{ mr: 2, fontSize: '1rem', color: 'primary.main' }} />:<ChatRoundedIcon sx={{ mr: 2, fontSize: '1rem', color: 'primary.main' }} />}
                <Typography sx={{ fontSize: '0.7rem' }}>{comment}</Typography>
            </Box>
        </>
    )
}

export default ReviewResultRow