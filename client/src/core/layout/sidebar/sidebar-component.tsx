import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SidebarMenuItem from "./menu/sidebar-menu-item";
import SidebarSubmenuItem from "./menu/sidebar-submenu-item";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { SidebarContext } from "./context/context";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SidebarComponent = () => {
  const { collapsed, onCollapse } = useContext(SidebarContext);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "Space-between",
          cursor: "pointer",
          // marginY: "1vh",
          marginX: "1vw",
        }}
        onClick={onCollapse}
      >
        {!collapsed ? (
          <>
            <CloseRoundedIcon
              sx={{
                color: "white",
                fontSize: "1.5rem",
                marginY: "1vh",
                marginX: "1vw",
              }}
            />
            <Box
              component="img"
              src="https://i.postimg.cc/J4VLnwfN/loading.png"
              sx={{ width: "3rem" }}
            />
          </>
        ) : (
          <MenuRoundedIcon sx={{ color: "white", fontSize: "1.5rem" }} />
        )}
      </Box>
      <SidebarMenuItem
        icon={
          <DashboardIcon sx={{ color: "primary.main", textAlign: "center" }} />
        }
        activeIcon={<DashboardIcon sx={{ color: "white" }} />}
        text="لوحة التحكم"
        path="/dashboard/home"
      />
      {
        <SidebarMenuItem
          icon={
            <PeopleIcon sx={{ color: "primary.main", textAlign: "center" }} />
          }
          activeIcon={<PeopleIcon sx={{ color: "white" }} />}
          text="المستخدمين"
          path="/dashboard/users"
        >
          <SidebarSubmenuItem
            text="إضافة مستخدم"
            path="/dashboard/users/create"
          />
          <SidebarSubmenuItem
            text="عرض المستخدمين"
            path="/dashboard/users/all"
          />
        </SidebarMenuItem>
      }
    </Box>
  );
};

export default SidebarComponent;
