import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Typography } from "@mui/material";
import PrimaryButton from "./btns/PrimaryButton";
import SecondaryButton from "./btns/SecondaryButton";

interface AlertDialogProps {
  openAlert: boolean,
  setOpenAlert:Function,
}

const AlertDialog = ({ openAlert, setOpenAlert }: AlertDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
    setOpenAlert(false);
  };
  useEffect(() => {
    if (openAlert) {
      setOpen(true);
    }
  }, [openAlert]);
  return (
    <Box
      sx={{
        display: open ? "flex" : "none",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1000",
      }}
    >
      <Box
        sx={{
          width: "30rem",
          height: "18rem",
          backgroundColor: "white",
          borderRadius: "15px",
          position: "absolute",
          boxShadow: "0 0 20px #00000070",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <WarningRoundedIcon
            sx={{ fontSize: "5rem", color: "primary.dark" }}
          />
          <Typography sx={{ marginY: "2rem", fontSize: "1.2rem" }}>
            سيتم فقد البيانات الموجودة في خانات اضافة المرافق
          </Typography>
          <Box>
            <PrimaryButton title="متابعة" />
            <SecondaryButton
              title="الغاء"
              sx={{ marginRight: "2rem" }}
              onClick={handleClose}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AlertDialog;
