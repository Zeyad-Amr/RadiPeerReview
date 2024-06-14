import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box, Button, Typography } from "@mui/material";
import ProfileDialog from "./ProfileDialog";
import { useEffect, useRef, useState } from "react";
import ArrowDropDownCircleRoundedIcon from "@mui/icons-material/ArrowDropDownCircleRounded";
const ProfileIcon = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node)
      ) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",

          paddingRight: "20px",
        }}
        onClick={handleClick}
      >
        <AccountCircleRoundedIcon
          sx={{
            color: "primary.darker",
            fontSize: "3.1rem",
          }}
        />
        <Box
          sx={{
            marginLeft: ".6rem",
          }}
        >
          <Typography
            sx={{
              color: "primary.darker",
              fontSize: "0.9rem",
              fontWeight: "600",
              textAlign: "left",
            }}
          >
            {props.name}
          </Typography>
          <Typography
            sx={{ color: "primary.main", fontSize: ".7rem", textAlign: "left" }}
          >
            {props.pos}
          </Typography>
        </Box>
        <ArrowDropDownCircleRoundedIcon
          sx={{
            color: "primary.darker",
            fontSize: "1.5rem",
            marginLeft: "1rem",
          }}
        />
      </Button>
      <ProfileDialog
        popperRef={popperRef}
        anchorEl={anchorEl}
        name={props.name}
      />
    </>
  );
};

export default ProfileIcon;
