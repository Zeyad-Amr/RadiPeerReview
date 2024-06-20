import { Typography } from '@mui/material'
import { Box, alpha } from '@mui/system'
import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
interface ErrorsRowProps {
    messages: { id: number; description: string; }[]
    title: string
}
const ErrorsRow = ({ messages, title }: ErrorsRowProps) => {
    return (
        <Box sx={{mt:2}}>
            <Typography sx={{ fontSize: '.8rem' }}>{title}</Typography>
            {messages.map((message: { id: number; description: string; }, i: number) =>
                <Box key={i} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    boxSizing: 'border-box',
                    backgroundColor: alpha('#ff8282', 0.2),
                    borderRadius: '0.5rem',
                    mt: 1
                }}>
                    <ErrorOutlineIcon sx={{ mr: 2, fontSize: '1rem', color: 'error.dark' }}/>
                    <Typography sx={{ fontSize: '0.7rem' }}>{message.description}</Typography>
                </Box>
            )}
        </Box>
    )
}

export default ErrorsRow