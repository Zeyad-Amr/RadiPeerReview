import PageTitle from '@/core/shared/components/PageTitle'
import { Grid } from '@mui/material'
import React from 'react'
import CountCard from '../../components/dashboard/CountCard'
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import SportsScoreRoundedIcon from '@mui/icons-material/SportsScoreRounded';
import Pie from '../../components/dashboard/Pie';
import Leaderboard from '../../components/dashboard/Leaderboard';
import NotificationsCard from '../../components/dashboard/NotificationsCard';

const DashboardPage = () => {
    return (
        <>
            <PageTitle title='Main Dashboard' />
            <Grid container spacing={1}>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <CountCard highlight title='Total Reports' number={22} icon={<FeedRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <CountCard title='Accepted Reports' number={15} icon={<CheckRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <CountCard title='Rejected Reports' number={5} icon={<ClearRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <CountCard title='Processing Reports' number={2} icon={<HourglassTopRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <CountCard title='Average Accepted Score' number={89.8} icon={<SportsScoreRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <CountCard title='Average Rejected Score' number={14.5} icon={<SportsScoreRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Pie />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Leaderboard />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <NotificationsCard />
                </Grid>
            </Grid>
        </>
    )
}

export default DashboardPage