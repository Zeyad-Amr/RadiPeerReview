import React from 'react'
import ChartCard from './ChartCard'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import { Box, Typography } from '@mui/material';
const Leaderboard = () => {
    const data = [
        {
            name: 'Body Yaser',
            AcceptedReports: '7',
        },
        {
            name: 'Zeyad Amr',
            AcceptedReports: '5',
        },
        {
            name: 'Ahmed Raouf',
            AcceptedReports: '3',
        },
    ]
    return (
        <ChartCard title='Leaderboard' icon={<LeaderboardRoundedIcon sx={{color:'secondary.main'}}/>} sx={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <Typography sx={{ flexBasis: '60%', color: 'primary.main', fontWeight: 'bold', fontSize:'0.8rem' }}>Name</Typography>
                <Typography sx={{ flexBasis: '40%', color: 'primary.main', fontWeight: 'bold', fontSize:'0.8rem' }}>Accepted Reports</Typography>
            </Box>
            <hr />
            {
                data.map((data, i) => (
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mb: 1 }} key={i}>
                        <Typography sx={{ flexBasis: '60%', color: 'primary.light', fontSize:'0.8rem' }}>{i + 1}. {data.name}</Typography>
                        <Typography sx={{ flexBasis: '40%', color: 'primary.light', fontSize:'0.8rem' }}>{data.AcceptedReports}</Typography>
                    </Box>

                ))

            }
        </ChartCard>
    )
}

export default Leaderboard