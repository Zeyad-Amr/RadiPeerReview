import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import NotificationsListComponent from "../../modules/notifications/view/compnents/NotificationsListComponent";
import NotificationsIconComponent from "@/modules/notifications/view/compnents/NotificationsIconComponent";

export default function AdminNavbar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const [currentDateTime, setCurrentDateTime] = React.useState<Date>(
    new Date()
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once after the initial render

  const formattedDate = currentDateTime.toISOString().split("T")[0];
  const formattedTime = currentDateTime.toTimeString().split(" ")[0];

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ color: "primary.main", mr: 2 }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
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

          <NotificationsIconComponent />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
