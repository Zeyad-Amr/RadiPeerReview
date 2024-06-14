import Box from "@mui/material/Box";
const SidebarMenuItemChildren = ({ children }: { children: any }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginX: "2rem",
        marginBottom: "1vh",
        marginTop: "1vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "1px",
          backgroundColor: "white",
          marginX: "1rem",
          marginBottom: "1rem",
        }}
      />

      <Box>{children}</Box>
    </Box>
  );
};

export default SidebarMenuItemChildren;
