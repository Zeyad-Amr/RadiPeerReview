import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

interface IconBtnProps {
    icon: ReactNode
    title: string
    onClick: (event:any) => void
    variant?: 'primary' | 'secondary'
}

const IconBtn = ({ icon, title, variant, onClick }: IconBtnProps) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            boxSizing: 'border-box',
            borderRadius: '1rem',
            backgroundColor: 'secondary.main',
            color: 'white',
            cursor: 'pointer'

        }}
            onClick={onClick}
        >
            {icon}
            <Typography sx={{ ml: 1, fontSize: '0.8rem' }}>{title}</Typography>
        </Box>
    )
}

export default IconBtn