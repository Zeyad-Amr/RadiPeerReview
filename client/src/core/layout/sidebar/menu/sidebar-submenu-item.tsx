import { Box, Typography } from "@mui/material";
import { SidebarContext } from "../context/context";
import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarSubmenuItemProps {
  text: string;
  path: string;
}

const SidebarSubmenuItem = ({ text, path }: SidebarSubmenuItemProps) => {
  const { collapsed } = useContext(SidebarContext);
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === path;

  const handleClick = () => {
    console.log("clicked");

    router.push(path);
  };

  return (
    <Box>
      <Box
        onClick={handleClick}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "nowrap",
          cursor: "pointer",
          marginY: "1vh",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: isActive ? "white" : "grey.500",
            display: collapsed ? "none" : "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            marginX: "0.5rem",
            marginBottom: "0.5rem",
            textOverflow: "ellipsis",
            "&:hover": {
              color: isActive ? "none" : "grey.600",
            },
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default SidebarSubmenuItem;
