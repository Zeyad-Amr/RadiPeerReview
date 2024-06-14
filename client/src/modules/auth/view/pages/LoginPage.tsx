import { Box } from "@mui/material";
import React from "react";

import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            overflow: "hidden",
            width: "100vw",
            height: "100vh",
            background:
              " linear-gradient(285deg, #0f70f2 10.66%, #0f70f2 102.7%)",
            borderTopLeftRadius: "100rem",
            borderTopRightRadius: "100rem",
            transform: "translateY(50%)",
          }}
        ></Box>
      </Box>
      <LoginForm />
    </>
  );
};

export default LoginPage;
