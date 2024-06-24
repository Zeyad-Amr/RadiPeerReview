import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch, useAppSelector } from "@/core/state/store";
import { logout } from "@/modules/auth/controllers/thunks/auth-thunk";
import NotificationsIconComponent from "@/modules/notifications/view/compnents/NotificationsIconComponent";
import { AuthState } from "@/modules/auth/controllers/types";
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import ChangePasswordForm from "@/modules/auth/view/components/ChangePasswordForm";

export default function RadiologistNavbar() {
  const authState: AuthState = useAppSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentDateTime, setCurrentDateTime] = React.useState<Date>(
    new Date()
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDateTime.toISOString().split("T")[0];
  const formattedTime = currentDateTime.toTimeString().split(" ")[0];

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const [popUp, setPopUp] = React.useState<boolean>(false);
  const isUpdated = (updated: boolean) => {
    setPopUp(!updated);
  }
  return (
    <>
      <CustomizedDialog open={popUp} setOpen={setPopUp} title="Change Password">
        <ChangePasswordForm isUpdated={isUpdated} />
      </CustomizedDialog>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "primary.lighter", boxShadow: "none" }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 3rem",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "0.8rem", color: "primary.light" }}>
                Hello
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                {/* if user.radioloigist show DR. */}
                {authState.user?.radiologist && "Dr."}
                {authState.user?.radiologist?.fname}{" "}
                {authState.user?.radiologist?.lname}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography>{formattedDate}</Typography>
              <Typography>{formattedTime}</Typography>
            </Box>
            <Box>
              <NotificationsIconComponent />
              <IconButton
                size="large"
                aria-label="show account menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <AccountCircleIcon sx={{ color: "primary.main" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => (setPopUp(true), handleMenuClose())}>
                  <PasswordRoundedIcon sx={{ fontSize: '1.5rem', color: 'secondary.main' }} />
                  <Typography sx={{ fontSize: '0.8rem', ml: '1rem' }}>Change Password</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutRoundedIcon sx={{ fontSize: '1.5rem', color: 'secondary.main' }} />
                  <Typography sx={{ fontSize: '0.8rem', ml: '1rem' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
