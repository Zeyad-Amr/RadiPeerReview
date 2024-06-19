import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

interface Author {
  name: string;
  avatar: string;
}

interface RequestProps {
  author: Author;
  content: string;
  time: string;
  likes: number;
}

const DisplayedRequest = ({ author, content, time, likes }: RequestProps) => {
  function getInitials(name: string): string {
    const words = name.split(" ");
    const initials = words
      .slice(0, 2)
      .map((word: string) => word.charAt(0).toUpperCase());
    return initials.join("");
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    do {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (color === "#FFFFFF" || color === "#EEEAFF");

    return color;
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
      <Avatar sx={{ bgcolor: getRandomColor()}} aria-label="recipe">
        <Typography sx={{ fontSize : "13px" , marginBottom : "-0.2rem" }}>{getInitials(author.name)}</Typography>
      </Avatar>
      <Box
        sx={{
          marginLeft: 2,
          border: "1px solid #3e3e3e",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {author.name}
        </Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="caption" color="textSecondary">
          {time}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {likes} likes
        </Typography>
      </Box>
    </Box>
  );
};

export default DisplayedRequest;
