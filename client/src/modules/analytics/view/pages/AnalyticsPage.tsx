import PageTitle from "@/core/shared/components/PageTitle";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import SportsScoreRoundedIcon from "@mui/icons-material/SportsScoreRounded";
import CountCard from "../components/CountCard";
import Pie from "../components/Pie";
import Leaderboard from "../components/Leaderboard";
import { RootState, useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  getAcceptedReports,
  getAverageFailureScore,
  getAverageSuccessScore,
  getLeaderboard,
  getPendingReports,
  getRejectedReports,
  getTotalReports,
} from "../../controllers/thunks/analytics-thunk";
import { leaderboardTransformedDataItem } from "../../interfaces/analytics-interface";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { AnalyticsState } from "../../controllers/types";
import { fPositive } from "@/core/shared/utils/format-number";
const DashboardPage = () => {
  const analyticsState: AnalyticsState = useAppSelector(
    (state: RootState) => state.analytics
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getTotalReports()),
        dispatch(getAcceptedReports()),
        dispatch(getRejectedReports()),
        dispatch(getPendingReports()),
        dispatch(getAverageSuccessScore()),
        dispatch(getAverageFailureScore()),
        dispatch(getLeaderboard()),
      ]);
    };

    fetchData();
  }, [dispatch]);

  const transformData = (
    originalData: any[]
  ): leaderboardTransformedDataItem[] => {
    return originalData.map((item) => {
      const name = `${item.creator.fname} ${item.creator.lname}`;
      const AcceptedReports = String(item._count.status);
      return { name, AcceptedReports };
    });
  };
  // data ? console.log(transformData(data.leaderboard)) : null;

  return (
    <>
      <PageTitle title="Main Dashboard" />
      <Grid container spacing={1} columns={20}>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            highlight
            title="Total Reports"
            number={analyticsState.dashboardData.totalReports}
            icon={<FeedRoundedIcon sx={{ fontSize: "inherit" }} />}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            title="Unassigned"
            number={fPositive(
              analyticsState.dashboardData.totalReports -
                (analyticsState.dashboardData.acceptedReports +
                  analyticsState.dashboardData.rejectedReports +
                  analyticsState.dashboardData.pendingReports)
            )}
            icon={<PersonAddAlt1Icon sx={{ fontSize: "inherit" }} />}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            title="Accepted"
            number={analyticsState.dashboardData.acceptedReports}
            icon={<CheckRoundedIcon sx={{ fontSize: "inherit" }} />}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            title="Reviewed"
            number={analyticsState.dashboardData.rejectedReports}
            icon={<ClearRoundedIcon sx={{ fontSize: "inherit" }} />}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xs={20}>
          <CountCard
            title="Processing"
            number={analyticsState.dashboardData.pendingReports}
            icon={<HourglassTopRoundedIcon sx={{ fontSize: "inherit" }} />}
          />
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={20}>
          <CountCard
            title="Average Acceptance Score"
            number={analyticsState.dashboardData.averageSuccessScore}
            icon={<SportsScoreRoundedIcon sx={{ fontSize: "inherit" }} />}
          />
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={20}>
          <CountCard
            title="Average Rejection Score"
            number={analyticsState.dashboardData.averageFailureScore}
            icon={<SportsScoreRoundedIcon sx={{ fontSize: "inherit" }} />}
          />
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={20}>
          <Pie
            Accepted={analyticsState.dashboardData.acceptedReports ?? 0}
            Pending={analyticsState.dashboardData.pendingReports ?? 0}
            Rejected={analyticsState.dashboardData.rejectedReports ?? 0}
          />
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={20}>
          <Leaderboard
            data={
              analyticsState.dashboardData
                ? transformData(analyticsState.dashboardData.leaderboard)
                : []
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
