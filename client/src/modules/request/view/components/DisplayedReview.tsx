import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

interface Author {
  name: string;
  avatar: string;
}

interface ReviewProps {
  author: Author;
  content: string;
  time: string;
}

const DisplayedReview: React.FC<ReviewProps> = ({ author, content, time }) => {
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 1,
        marginLeft: 2.5,
        paddingLeft: 2,
      }}
    >
      <span
        style={{
          height: "2px",
          width: "7rem",
          backgroundColor: "gray",
          marginLeft: "-4.4rem",
          marginTop: "-2rem",
          transform: "rotate(90deg)",
        }}
      ></span>
      <span
        style={{
          height: "2px",
          width: "1rem",
          backgroundColor: "gray",
          marginLeft: "-3.5rem",
          marginRight: "0.8rem",
        }}
      ></span>
      <Avatar sx={{ bgcolor: getRandomColor() }} aria-label="recipe">
        <Typography sx={{ fontSize: "13px", marginBottom: "-0.2rem" }}>
          {getInitials(author.name)}
        </Typography>
      </Avatar>
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="body2" color="textSecondary">
          {author.name}
        </Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="caption" color="textSecondary">
          {time}
        </Typography>
      </Box>
    </Box>
  );
};

export default DisplayedReview;
