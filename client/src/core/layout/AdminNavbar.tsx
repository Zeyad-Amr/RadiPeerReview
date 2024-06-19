import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import Notifications from "./Notifications";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

export default function AdminNavbar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  React.useState<null | HTMLElement>(null);
  const [scale, setScale] = React.useState(false)

  const router = useRouter();
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

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
            padding: {
              lg: "1rem 3rem",
              md: "1rem 3rem",
              sm: "1rem 1rem",
              xs: "1rem 1rem",
            },
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1, color: 'primary.main' }}
              onClick={() => setOpen(!open)}

            >
              <MenuIcon />
            </IconButton>
            <Box onClick={() => router.push('/')}>
              <Box
                component="img"
                src=".././assets/hlogo.png "
                alt=""
                sx={{
                  width: "12rem",
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                }}
              ></Box>
            </Box>
          </Box>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography sx={{ fontWeight: "600" }}>
              {formattedDate}
            </Typography>
            <Typography >
              {formattedTime}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => setScale(!scale)}
            >
              <Badge badgeContent={17} sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "secondary.main",
                  color: 'white'
                }
              }}>
                <NotificationsIcon sx={{ color: 'primary.main' }} />
              </Badge>
            </IconButton>
          </Box>
          <Notifications scaleProp={scale} />
          {/* ###################################################################### */}
          {/* ############################### MOBILE ############################### */}
          {/* ###################################################################### */}

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
                sx={{ padding: 0 }}
                onClick={() => setOpen(!open)}

              >
                <MenuIcon />
              </IconButton>
              <Box onClick={() => router.push('/')}>
                <Box
                  component="img"
                  src=".././assets/hlogo.png "
                  alt=""
                  sx={{
                    width: "7rem",
                    display: { lg: "none", md: "none", sm: "flex", xs: "flex" },
                    mr: 1,
                  }}
                ></Box>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>

              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => setScale(!scale)}
              >
                <Badge badgeContent={17} sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "secondary.main",
                    color: 'white'
                  }
                }}>
                  <NotificationsIcon sx={{ color: 'primary.main' }} />
                </Badge>
              </IconButton>

            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
