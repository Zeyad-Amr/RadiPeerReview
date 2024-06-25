"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from "@mui/material";
import { useAppDispatch } from "../state/store";
import { logout } from "@/modules/auth/controllers/thunks/auth-thunk";

const Unauthorized: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleRedirect = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box sx={{ boxShadow: 3, padding: "40px", borderRadius: "10px" }}>
        <Typography variant="h3" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" gutterBottom>
          You do not have permission to view this page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
          sx={{ marginTop: "20px" }}
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
