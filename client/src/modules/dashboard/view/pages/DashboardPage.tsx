import PageTitle from '@/core/shared/components/PageTitle'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import SportsScoreRoundedIcon from '@mui/icons-material/SportsScoreRounded';
import NotificationsCard from '../components/NotificationsCard';
import CountCard from '../components/CountCard';
import Pie from '../components/Pie';
import Leaderboard from '../components/Leaderboard';
import { useAppSelector, RootState, useAppDispatch } from '@/core/state/store';
import { dashboardState } from '../../controllers/types';
import { getAcceptedReports, getAverageFailureScore, getAverageSuccessScore, getLeaderboard, getPendingReports, getRejectedReports, getTotalReports } from '../../controllers/thunks/dashboard-thunk';
import { RadiologistData, dashboardData, leaderboardTransformedDataItem } from '../../interfaces/dashboard-interface';

const DashboardPage = () => {

    const [data, setData] = useState<dashboardData>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const totalReports = await dispatch(getTotalReports()).unwrap();
            const acceptedReports = await dispatch(getAcceptedReports()).unwrap();
            const rejectedReports = await dispatch(getRejectedReports()).unwrap();
            const pendingReports = await dispatch(getPendingReports()).unwrap();
            const averageSuccessScore = await dispatch(getAverageSuccessScore()).unwrap();
            const averageFailureScore = await dispatch(getAverageFailureScore()).unwrap();
            const leaderboard = await dispatch(getLeaderboard()).unwrap();
            console.log(leaderboard);
            setData(
                {
                    'totalReports': totalReports.response.data,
                    'acceptedReports': acceptedReports.response.data,
                    'rejectedReports': rejectedReports.response.data,
                    'pendingReports': pendingReports.response.data,
                    'averageSuccessScore': averageSuccessScore.response.data,
                    'averageFailureScore': averageFailureScore.response.data,
                    'leaderboard': leaderboard
                },
            );
        };

        fetchData();
    }, [dispatch]);

    const transformData = (originalData: any[]): leaderboardTransformedDataItem[] => {
        return originalData.map(item => {
            const name = `${item.response.creator.fname} ${item.response.creator.lname}`;
            const AcceptedReports = String(item.response._count.approved);
            return { name, AcceptedReports };
        });
    };
    data ? console.log(transformData(data.leaderboard)) : null

    return (
        <>
            <PageTitle title='Main Dashboard' />
            <Grid container spacing={1}>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <CountCard highlight title='Total Reports' number={data?.totalReports ?? '-'} icon={<FeedRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <CountCard title='Accepted Reports' number={data?.acceptedReports ?? '-'} icon={<CheckRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <CountCard title='Reviewed Reports' number={data?.rejectedReports ?? '-'} icon={<ClearRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <CountCard title='Processing Reports' number={data?.pendingReports ?? '-'} icon={<HourglassTopRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <CountCard title='Average Accepted Score' number={data?.averageSuccessScore ?? '-'} icon={<SportsScoreRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <CountCard title='Average Rejected Score' number={data?.averageFailureScore ?? '-'} icon={<SportsScoreRoundedIcon sx={{ fontSize: 'inherit' }} />} />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Pie Accepted={data?.acceptedReports ?? 0} Pending={data?.pendingReports ?? 0} Rejected={data?.rejectedReports ?? 0} />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Leaderboard data={data ? transformData(data.leaderboard) : []} />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <NotificationsCard />
                </Grid>
            </Grid>
        </>
    )
}

export default DashboardPage

function getTotalResponseReports(): any {
    throw new Error('Function not implemented.');
}
