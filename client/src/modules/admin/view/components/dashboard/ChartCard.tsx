import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

interface ChartCardProps {
    title: string
    icon: ReactNode
    children: ReactNode
    sx?: any
}

const ChartCard = ({ title, icon, children, sx }: ChartCardProps) => {
    return (
        <Box sx={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            height:'17rem',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'secondary.main',
                padding: ' 0.75rem 1rem',
                borderTopLeftRadius: ' 1rem',
                borderTopRightRadius: ' 1rem',
                color: 'white',
            }}>
                {icon}
                <Typography sx={{ ml: 2 }}>{title}</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                boxSizing: 'border-box',
                padding: '1rem',
                overflowY: 'auto',
                height:'14rem',

                ...sx
            }}>
                {children}
            </Box>
        </Box>
    )
}

export default ChartCard