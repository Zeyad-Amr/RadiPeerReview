import { Box, Typography } from "@mui/material";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface SubHeaderProps {
  SubHeaderText: string;
  setAddingCompanion: Function;
  handleEditBtn: Function;
  compStateChanger: Function;
  setSubmitFlag: Function;
}

const SubHeader = ({
  SubHeaderText,
  setAddingCompanion,
  handleEditBtn,
  compStateChanger,
  setSubmitFlag,
}: SubHeaderProps) => {
  return (
    <Box sx={{ width: "100%", marginBottom: "1rem" }}>
      <Box
        sx={{
          width: "100%",
          height: "0.3rem",
          backgroundColor: "primary.darker",
        }}
      ></Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
            height: "2rem",
            backgroundColor: "primary.darker",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Typography
            sx={{ color: "white", fontSize: "1rem", fontWeight: "600" }}
          >
            {SubHeaderText}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2rem",
            height: "2rem",
            backgroundColor: "primary.darker",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            cursor: "pointer",
            zIndex: 1000
          }}
          onClick={() => {
            setAddingCompanion("none");
            handleEditBtn();
            compStateChanger("none");
            setSubmitFlag(false);
          }}
        >
          <CloseRoundedIcon sx={{ color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default SubHeader;
