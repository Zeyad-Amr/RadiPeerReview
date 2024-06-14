import { Button } from "@mui/material";
import React from "react";

interface PrimaryButtonTypes {
  id?: string,
  type?: 'button' | 'submit' | 'reset' | undefined,
  title: string,
  onClick?: () => void,
  display?: string,
  sx?: any

}

const PrimaryButton = ({ id, type, title, onClick, display, sx }: PrimaryButtonTypes) => {

  return (
    <Button
      id={id}
      sx={{
        display: display,
        color: "#fff",
        backgroundColor: "#0f70f2",
        fontSize: "0.9rem",
        height: "40px",
        padding: "0 3rem",
        '&:hover': {
          backgroundColor: "#0f70f2",

        },
        ...sx,
      }}
      onClick={onClick}
      type={type}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
