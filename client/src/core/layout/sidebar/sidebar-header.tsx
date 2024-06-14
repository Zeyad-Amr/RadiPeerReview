import Box from "@mui/material/Box";
import { SidebarContext } from "./context/context";
import React, { useContext } from "react";
import Button from "@mui/material/Button";
import {
  LogoIcon,
  MenuIcon,
  CloseIcon,
  NotificationIcon,
} from "@/assets/icons/index";
import ProfileIcon from "@/core/shared/components/profile/ProfileIcon";
import { SessionStorage, SessionStorageKeys } from "@/core/shared/utils/session-storage";

interface SidebarHeaderProps {
  height?: string;
}
const SidebarHeader = (props: SidebarHeaderProps) => {
  const userData = SessionStorage.getDataByKey(SessionStorageKeys.userData)
  const { collapsed, onCollapse } = useContext(SidebarContext);
  return (
    <Box
      sx={{
        position: "relative", 
        width: "100%",
        height: props.height || "5vh",
        backgroundColor: "primary.darker",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: "1rem",
        paddingY: "clamp(0.5rem, 1vw, 1rem)",
        // marginBottom: '-1rem',
      }}
    >
        <Box
          sx={{
            position:'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            width:'100%',
            height:'85%',
            borderRadius:'20px 20px 0 0 ',
          }}
        >

        </Box>
        <Button
          onClick={onCollapse}
          sx={{
            paddingX: "0.1rem",
            paddingY: "0.7rem",
          }}
        >
          <Box
            sx={{
              width: "0.9rem",
              height: "0.9rem",
            }}
          >
            {!collapsed ? (
              <CloseIcon primary="#232836" />
            ) : (
              <MenuIcon primary="#232836" />
            )}
          </Box>
        </Button>  
      <Box
        sx={{
          width: "3rem",
          height: "3rem",

        }}
      >
        <Box sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'2rem'}}>
          <LogoIcon primary="#232836"/>
        </Box>
      </Box>
      <Box sx={{display:'flex'}}>
        <Button
          onClick={() => console.log("Notification")}
          sx={{
            paddingX: "0.1rem",
            paddingY: "0.7rem",
          }}
        >
          <Box
            sx={{
              width: "1.3rem",
              height: "1.3rem",
            }}
          >
              <NotificationIcon primary="#232836" />
            </Box>
        </Button>
        <ProfileIcon name={userData?.user?.username} pos={userData?.user?.employee?.role?.value} />
      </Box>
    </Box>
  );
};

export default SidebarHeader;
