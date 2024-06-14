import HeaderText from "@/core/shared/components/headers/HeaderText";
import { Box } from "@mui/system";
import React from "react";

const PageHeader = (props: any) => {
  // const updatedChildren = React.cloneElement(
  //     props.children,
  //     { sx: { ...props.children.props.style,
  //         position:'absolute',
  //         right:'1rem',
  //         fontSize:'11.2rem',
  //         color:'white',
  //         filter: "drop-shadow(5px 5px 6px #0000008f);",
  //     } }
  // )

  return (
    <Box sx={{ display: "flex", width: "40%", margin:'0 auto' }}>
      <Box
        sx={{
          mixBlendMode: "multiply",
          width: "1rem",
          backgroundColor: "primary.darker",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "1rem",
            height: "100%",
            backgroundColor: "white",
            borderTopRightRadius: "100px",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          backgroundColor: "primary.darker",
          color: "white",
          padding: "0.5rem 2rem",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* {updatedChildren}   */}
        <HeaderText title={props.title} />
      </Box>

      <Box
        sx={{
          mixBlendMode: "multiply",
          width: "1rem",
          backgroundColor: "primary.darker",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "1rem",
            height: "100%",
            backgroundColor: "white",
            borderTopLeftRadius: "100px",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default PageHeader;
