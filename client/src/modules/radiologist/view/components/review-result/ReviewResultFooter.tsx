import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
interface ReviewResultFooterProps {
    comment: string
    feedback: string
}

const ReviewResultFooter = ({ comment, feedback }: ReviewResultFooterProps) => {
    return (
        <Grid container spacing={2} sx={{mt:'-1.5rem'}}>
            <Grid item lg={6} md={6} sm={6} xs={12} >
                <Box sx={{

                    padding: '1rem',
                    boxSizing: 'border-box',
                    backgroundColor: 'primary.lighter',
                    borderRadius: '0.5rem',
                    mt: 1
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <ChatRoundedIcon sx={{ mr: 2, fontSize: '1rem', color: 'primary.main' }} />
                        <Typography sx={{ fontSize: '0.85rem' }}>Additional Reviewer Comments</Typography>
                    </Box>
                    <Typography sx={{mt:1, fontSize:'0.7rem',}}>{comment}</Typography>
                </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} >
                <Box sx={{

                    padding: '1rem',
                    boxSizing: 'border-box',
                    backgroundColor: 'primary.lighter',
                    borderRadius: '0.5rem',
                    mt: 1
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <ThumbUpOffAltRoundedIcon sx={{ mr: 2, fontSize: '1rem', color: 'primary.main' }} />
                        <Typography sx={{ fontSize: '0.85rem' }}>Feedback To Radiologist</Typography>
                    </Box>
                    <Typography sx={{mt:1, fontSize:'0.7rem',}}>{feedback}</Typography>
                </Box>
            </Grid>

        </Grid>
    )
}

export default ReviewResultFooter