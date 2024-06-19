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
        backgroundColor: 'secondary.main',
        fontSize: "0.8rem",
        height: "40px",
        padding: "0 3rem",
        '&:hover': {
          backgroundColor: 'secondary.main',

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
