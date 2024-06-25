import {
  CustomDataTable,
  HeaderItem,
} from "@/core/shared/components/CustomDataTable";
import PageTitle from "@/core/shared/components/PageTitle";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode, useEffect } from "react";
import AssignReview from "../../components/admin/AssignReview";
import { RootState, useAppDispatch, useAppSelector } from "@/core/state/store";
import { UserInterface } from "@/modules/auth/interfaces/user-interface";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { getAllRequests } from "@/modules/review-requests/controllers/thunks/request-thunk";
import { Role } from "@/core/shared/constants/enums";
import { RequestState } from "@/modules/review-requests/controllers/types";
import { getRadiologistList } from "@/modules/radiologists/controllers/thunks/radiologist-thunk";
import { RadiologistState } from "@/modules/radiologists/controllers/types";
import { ReviewRequestInterface } from "@/modules/review-requests/interfaces/review-request-interface";
const AdminRequestsPage = () => {
  const requestState: RequestState = useAppSelector(
    (state: RootState) => state.request
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRequests(false));
    dispatch(getRadiologistList());
  }, [dispatch]);

  // get all radiologists //
  function formatRadiologists(users: UserInterface[], creator: string) {
    const usersArray: { id: string; value: string }[] = [];
    users.map((user: UserInterface) => {
      if (
        user.role === Role.RADIOLOGIST &&
        ` ${user.radiologist?.fname} ${user.radiologist?.lname}` !==
          ` ${creator}`
      ) {
        usersArray.push({
          id: user.id,
          value: `${user.radiologist?.fname} ${user.radiologist?.lname}`,
        });
      }
    });
    return usersArray;
  }
  const radiologistState: RadiologistState = useAppSelector(
    (state: RootState) => state.radiologists
  );

  const getIcon = (status?: string): ReactNode => {
    switch (status) {
      case "created":
        return (
          <PersonAddAlt1RoundedIcon
            sx={{ mr: 1, color: "secondary.main", fontSize: "1.3rem" }}
          />
        );
      case "Assigned":
        return (
          <HourglassTopRoundedIcon
            sx={{ mr: 1, color: "secondary.main", fontSize: "1.3rem" }}
          />
        );
      case "Reviewed":
        return (
          <RefreshRoundedIcon
            sx={{ mr: 1, color: "secondary.main", fontSize: "1.3rem" }}
          />
        );
      case "Completed":
        return (
          <CheckRoundedIcon
            sx={{ mr: 1, color: "secondary.main", fontSize: "1.3rem" }}
          />
        );
      default:
        return (
          <PersonAddAlt1RoundedIcon
            sx={{ mr: 1, color: "secondary.main", fontSize: "1.3rem" }}
          />
        );
    }
  };

  let newTableData: any[] = [];
  requestState.allRequests.forEach((item: ReviewRequestInterface) => {
    newTableData.push({
      reportName: item.name ?? "-",
      date: (
        <Typography sx={{ fontSize: "0.8rem" }}>{item.createdAt}</Typography>
      ),
      reportAuther: item.creator?.fname + " " + item.creator?.lname,
      reportReviwer:
        item.reviewer === undefined ? (
          <AssignReview
            id={item.id ?? ""}
            users={formatRadiologists(
              radiologistState.radiologists,
              item.creator?.fname + " " + item.creator?.lname
            )}
          />
        ) : (
          <Typography sx={{ fontSize: "0.8rem" }}>
            {item.reviewer?.fname + " " + item.reviewer?.lname}
          </Typography>
        ),
      status: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "Center",
          }}
        >
          {getIcon(item.status)}
          <Typography
            sx={{
              fontSize: "0.8rem",
              width: "5rem",
            }}
          >
            {item.status === "Completed" ? "Accepted" : item.status}
          </Typography>
        </Box>
      ),
      score: item.score ?? "--",
    });
  });

  const header: HeaderItem[] = [
    {
      filterKey: "reportName",
      id: "reportName",
      label: "Name",
      minWidth: 50,
      tableCellProps: { align: "left" },
      showBorder: true,
    },
    {
      filterKey: "date",
      id: "date",
      label: "Date",
      minWidth: 50,
      tableCellProps: { align: "left" },
      isComponent: true,
    },
    {
      filterKey: "reportAuther",
      id: "reportAuther",
      label: "Report Auther",
      minWidth: 50,
      tableCellProps: { align: "left" },
    },
    {
      filterKey: "reportReviwer",
      id: "reportReviwer",
      label: "Report Reviwer",
      minWidth: 50,
      tableCellProps: { align: "left" },
      isComponent: true,
    },
    {
      filterKey: "status",
      id: "status",
      label: "Status",
      minWidth: 50,
      tableCellProps: { align: "left" },
      isComponent: true,
    },
    {
      filterKey: "score",
      id: "score",
      label: "Score",
      minWidth: 50,
      tableCellProps: { align: "left" },
      isComponent: true,
    },
  ];
  return (
    <>
      <PageTitle title="Review Requests" />
      <CustomDataTable
        data={newTableData}
        totalItems={newTableData.length}
        headerItems={header}
        fetchData={() => {}}
        showToolbar={false}
        showPagination={false}
        stickyHeader={true}
        boxShadow={0}
        height="71vh"
      />
    </>
  );
};

export default AdminRequestsPage;
