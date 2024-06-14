import { Box } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React from "react";
import { Typography } from "@mui/material";

interface CustomizeDialogProps {
  display: string;
  DialogStateController: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  children: React.ReactNode;
}

const Dialog = ({
  display,
  DialogStateController,
  title,
  children,
}: CustomizeDialogProps) => {
  return (
    <Box sx={{ display: display }}>
      <Box
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "#000000aa",
          zIndex: "1000",
          filter: "blur(0.5px)",
        }}
      ></Box>
      <Box
        sx={{
          padding: "2rem",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "1001",
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "primary.dark",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: ".25rem 2rem",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            <CloseRoundedIcon
              sx={{
                color: "white",
                margin: "0.5rem",
                fontSize: "2rem",
                cursor: "pointer",
              }}
              onClick={() => DialogStateController("none")}
            />
            <Typography sx={{ color: "white", fontWeight: "600" }}>
              {title}
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Dialog;
