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
import Notifications from "..//Notifications";

export default function RadiologistNavbar() {
    React.useState<null | HTMLElement>(null);
    const [scale, setScale] = React.useState(false)

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
    }, []); 

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
                        <Box>
                            <Typography sx={{ fontSize: '0.8rem', color: 'primary.light' }}> Hello </Typography>
                            <Typography sx={{ fontSize: '1rem', color: 'primary.main', fontWeight: 'bold' }}> Dr. Body Yaser </Typography>
                        </Box>
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
                            <Box>
                                <Typography sx={{ fontSize: '0.8rem', color: 'primary.light' }}> Hello </Typography>
                                <Typography sx={{ fontSize: '1rem', color: 'primary.main', fontWeight: 'bold' }}> Dr. Body Yaser </Typography>
                            </Box>
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
