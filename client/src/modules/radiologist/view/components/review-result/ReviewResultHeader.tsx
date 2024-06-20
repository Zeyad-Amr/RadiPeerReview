import { Box, Typography, alpha } from '@mui/material';
import React from 'react'
import ReviewTag from './ReviewTag';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import AssistantRoundedIcon from '@mui/icons-material/AssistantRounded';
import Br from './Br';
interface ReviewResultHeaderProps {
    reportName: string;
    result: 5 | 4 | 3 | 2 | 1 | number
    comment?: string
    suggestion?: boolean

}
const ReviewResultHeader = ({ reportName, result, comment, suggestion }: ReviewResultHeaderProps) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'secondary.main' }}>
                    {result >= 3 ? <CheckRoundedIcon /> : <BlockRoundedIcon />}
                    <Box sx={{ ml: 2 }}>
                        <Typography sx={{ color: 'primary.light', fontSize: '0.8rem' }}>Review Result</Typography>
                        <Typography sx={{ fontSize: '1.2rem', color: 'primary.main' }}>{reportName}</Typography>
                    </Box>
                </Box>
                <ReviewTag text={result} type='score' />
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                boxSizing: 'border-box',
                backgroundColor: suggestion ? alpha('#061540', 1) : 'primary.lighter',
                borderRadius: '0.5rem',
                color: suggestion ? 'white' : 'auto',
                mt: 1
            }}>
                {suggestion ? <AssistantRoundedIcon sx={{ mr: 2, fontSize: '1rem', color: 'primary.lighter' }} /> : <ChatRoundedIcon sx={{ mr: 2, fontSize: '1rem', color: 'primary.main' }} />}
                <Typography sx={{ fontSize: '0.7rem' }}>{comment}</Typography>
            </Box>
            <Br />
        </>
    )
}

export default ReviewResultHeader