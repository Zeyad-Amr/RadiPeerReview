import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

interface CountCardProps {
    title: string
    number: number
    icon: ReactNode
    highlight?: boolean
    success?: boolean
    fail?: boolean
}

const CountCard = ({ title, number, icon, highlight, success, fail }: CountCardProps) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: highlight ? 'secondary.main' : (success ? 'success.light' : (fail ? 'error.light' : 'white')),
            padding: '1rem',
            borderRadius: '1rem',
        }}>
            <Box sx={{
                backgroundColor: highlight || success || fail ? 'white' : 'primary.lighter', height: '4rem', width: '4rem', display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                marginRight: '1rem',
                fontSize: '2rem',
                color: success ? 'success.dark' : (fail ? 'error.dark' : 'secondary.main'),
            }}>
                {icon}
            </Box>
            <Box sx={{ mt: 1 }}>
                <Typography sx={{ color: highlight ? 'primary.lighter' : (success ? 'success.dark' : (fail ? 'error.dark' : 'primary.light')), fontSize: '0.8rem' }}>{title}</Typography>
                <Typography sx={{ color: highlight ? 'white' : (success ? 'success.darker' : (fail ? 'error.darker' : 'primary.main')), fontSize: '2rem', fontWeight: 'bold' }}>{number}</Typography>
            </Box>
        </Box>
    )
}

export default CountCard