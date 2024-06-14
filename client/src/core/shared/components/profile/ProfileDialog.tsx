import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Popper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useRouter } from "next/navigation";
import { SessionStorage } from "../../utils/session-storage";
import ConfirmationDialog from "../ConfirmationDialog";
import { useAppDispatch, useAppSelector } from "@/core/state/store";

const ProfileDialog = ({
  popperRef,
  name,
  anchorEl,
}: {
  popperRef: any;
  name: string;
  anchorEl: any;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        sx={{ zIndex: 1000 }}
      >
        <Box
          ref={popperRef}
          sx={{
            boxShadow: "0 0 6px #00000025",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "1rem 2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccountCircleRoundedIcon sx={{ fontSize: "5rem" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                margin: "0.5rem 0 0.5rem 0",
              }}
            >
              {/* اهلاً */}
              <Typography sx={{ fontWeight: "bold" }}>
                {name.length > 15 ? name.substring(0, 15) + "..." : name}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "primary.light",
                margin: "0.5rem 0",
              }}
            />

            <Box
              onClick={() => {
                setShowConfirmationDialog(true);
              }}
              sx={{
                width: "100%",
                display: "flex",
                color: "red",
                cursor: "pointer",
                transition: "0.2s",
                padding: "10px 20px",
                borderRadius: "5px",
                pointerEvents: "auto !important",
                "&:hover": { backgroundColor: "primary.lighter" },
              }}
            >
              <LogoutIcon sx={{ fontSize: "1.5rem" }} />
              <Typography
                sx={{
                  marginLeft: "1rem",
                  fontSize: "0.9rem",
                  fontWeight: "semibold",
                }}
              >
                تسجيل الخروج
              </Typography>
            </Box>
          </Box>
        </Box>
      </Popper>
      {/* confirmation dialog */}
      <ConfirmationDialog
        confirmFunction={() => {
          SessionStorage.clearAll();
          router.push("/login");
        }}
        contentMessage="هل أنت متأكد أنك تريد تسجيل الخروج؟ سيتم مسح جميع البيانات المؤقتة وسيتم إعادة توجيهك إلى صفحة تسجيل الدخول."
        open={showConfirmationDialog}
        setOpen={setShowConfirmationDialog}
        title="تسجيل خروج"
      />
    </>
  );
};

export default ProfileDialog;
