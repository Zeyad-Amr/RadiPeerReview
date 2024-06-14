import { Box, Typography } from "@mui/material";
import { SidebarContext } from "../context/context";
import React, { useContext, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import SidebarMenuItemChildren from "./sidebar-menu-item-children";
interface SidebarMenuItemProps {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  text: string;
  path: string;
}

const SidebarMenuItem = ({
  children,
  icon,
  activeIcon,
  text,
  path,
}: SidebarMenuItemProps & { children?: any }) => {
  const { collapsed, onCollapse } = useContext(SidebarContext);

  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname.startsWith(path);
  const [expanded, setExpanded] = useState(isActive);

  const handleClick = () => {
    if (children) {
      if (collapsed) {
        onCollapse();
        setExpanded(true);
      } else {
        setExpanded(!expanded);
      }
    } else {
      router.push(path);
    }
  };

  return (
    <Box>
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          flexWrap: "nowrap",
          cursor: "pointer",
          backgroundColor: isActive ? "#ffffff30" : "transparent",
          borderRadius: "10px",
          marginY: "1vh",
          marginX: "1vw",
          "&:hover": {
            backgroundColor: isActive ? "#ffffff30" : "#ffffff15",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "start",
            flexWrap: "nowrap",
          }}
        >
          <Box
            sx={{
              width: "3rem",
              height: "3rem",
              padding: "0.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isActive ? activeIcon : icon}
          </Box>
          <Typography
            variant="body1"
            sx={{
              // fontWeight: "bold",
              color: "white",
              // color: 'primary.main',
              display: collapsed ? "none" : "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              marginX: "0.5rem",
            }}
          >
            {text}
          </Typography>
        </Box>
        <ExpandMore
          sx={{
            display: !expanded && !collapsed && children ? "block" : "none",
            color: "white",
            marginX: "0.5rem",
          }}
        />
        <ExpandLess
          sx={{
            display: expanded && !collapsed && children ? "block" : "none",
            color: "white",
            marginX: "0.5rem",
          }}
        />
      </Box>
      {children && (
        <Box
          sx={{
            display: collapsed ? "none" : "flex",
            height: expanded ? (children.length + 1) * 2.5 + "rem" : 0,
            transition: "height 0.5s ease",
            overflow: "hidden",
          }}
        >
          <SidebarMenuItemChildren>{children}</SidebarMenuItemChildren>
        </Box>
      )}
    </Box>
  );
};

export default SidebarMenuItem;
