import PageTitle from "@/core/shared/components/PageTitle";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import SportsScoreRoundedIcon from "@mui/icons-material/SportsScoreRounded";
import CountCard from "../components/CountCard";
import Pie from "../components/Pie";
import Leaderboard from "../components/Leaderboard";
import { useAppDispatch } from "@/core/state/store";
import {
  getAcceptedReports,
  getAverageFailureScore,
  getAverageSuccessScore,
  getLeaderboard,
  getPendingReports,
  getRejectedReports,
  getTotalReports,
} from "../../controllers/thunks/dashboard-thunk";
import {
  dashboardData,
  leaderboardTransformedDataItem,
} from "../../interfaces/dashboard-interface";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
const DashboardPage = () => {

  const [data, setData] = useState<dashboardData>();
  const dispatch = useAppDispatch();

  function roundNumber(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    const roundedValue = Math.round(value * factor) / factor;
    return Number.isInteger(roundedValue) ? roundedValue : parseFloat(roundedValue.toFixed(decimals));
  }

  useEffect(() => {
    const fetchData = async () => {
      const [
        totalReports,
        acceptedReports,
        rejectedReports,
        pendingReports,
        averageSuccessScore,
        averageFailureScore,
        leaderboard
      ] = await Promise.all([
        dispatch(getTotalReports()).unwrap(),
        dispatch(getAcceptedReports()).unwrap(),
        dispatch(getRejectedReports()).unwrap(),
        dispatch(getPendingReports()).unwrap(),
        dispatch(getAverageSuccessScore()).unwrap(),
        dispatch(getAverageFailureScore()).unwrap(),
        dispatch(getLeaderboard()).unwrap()
      ]);

      setData(
        {
          'totalReports': totalReports.response.data,
          'unassignedReports': totalReports.response.data - (acceptedReports.response.data + rejectedReports.response.data + pendingReports.response.data),
          'acceptedReports': acceptedReports.response.data,
          'rejectedReports': rejectedReports.response.data,
          'pendingReports': pendingReports.response.data,
          'averageSuccessScore': roundNumber(averageSuccessScore.response.data, 2),
          'averageFailureScore': roundNumber(averageFailureScore.response.data, 2),
          'leaderboard': leaderboard
        },
      );
    };

    fetchData();
  }, [dispatch]);


  const transformData = (
    originalData: any[]
  ): leaderboardTransformedDataItem[] => {
    return originalData.map((item) => {
      const name = `${item.response.creator.fname} ${item.response.creator.lname}`;
      const AcceptedReports = String(item.response._count.status);
      return { name, AcceptedReports };
    });
  };
  data ? console.log(transformData(data.leaderboard)) : null;

  return (
    <>
      <PageTitle title="Main Dashboard" /><Grid container spacing={1} columns={20}>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            highlight
            title="Total Reports"
            number={data?.totalReports ?? "-"}
            icon={<FeedRoundedIcon sx={{ fontSize: "inherit" }} />} />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            title="Unassigned"
            number={data?.unassignedReports ?? "-"}
            icon={<PersonAddAlt1Icon sx={{ fontSize: "inherit" }} />} />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            title="Accepted"
            number={data?.acceptedReports ?? "-"}
            icon={<CheckRoundedIcon sx={{ fontSize: "inherit" }} />} />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            title="Reviewed"
            number={data?.rejectedReports ?? "-"}
            icon={<ClearRoundedIcon sx={{ fontSize: "inherit" }} />} />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            title="Processing"
            number={data?.pendingReports ?? "-"}
            icon={<HourglassTopRoundedIcon sx={{ fontSize: "inherit" }} />} />
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={20}>
          <CountCard
            title="Average Acceptance Score"
            number={data?.averageSuccessScore ?? "-"}
            icon={<SportsScoreRoundedIcon sx={{ fontSize: "inherit" }} />} />
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={20}>
          <CountCard
            title="Average Rejection Score"
            number={data?.averageFailureScore ?? "-"}
            icon={<SportsScoreRoundedIcon sx={{ fontSize: "inherit" }} />} />
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={20}>
          <Pie
            Accepted={data?.acceptedReports ?? 0}
            Pending={data?.pendingReports ?? 0}
            Rejected={data?.rejectedReports ?? 0} />
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={20}>
          <Leaderboard data={data ? transformData(data.leaderboard) : []} />
        </Grid>
        {/* <Grid item lg={10} md={10} sm={10} xs={20}>
                <NotificationsCard />
                </Grid>
                */}
      </Grid>
    </>
  )
}

export default DashboardPage
