import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import Notifications from "../Notifications";
import { useAppDispatch } from "@/core/state/store";
import { logout } from "@/modules/auth/controllers/thunks/auth-thunk";

export default function RadiologistNavbar() {
  const [scale, setScale] = React.useState(false);
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
    // Add logout logic here
    dispatch(logout());
    router.push("/login");
  };

  return (
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
              Dr. Body Yaser
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
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => setScale(!scale)}
            >
              <Badge
                badgeContent={17}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "secondary.main",
                    color: "white",
                  },
                }}
              >
                <NotificationsIcon sx={{ color: "primary.main" }} />
              </Badge>
            </IconButton>
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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
          <Notifications scaleProp={scale} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
