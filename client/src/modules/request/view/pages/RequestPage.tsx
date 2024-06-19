import { Feedback } from "@mui/icons-material";
import { Box, Container } from "@mui/system";
import React from "react";
import MainReport from "../components/DisplayedRequest";
import Review from "../components/DisplayedReview";
import DisplayedRequest from "../components/DisplayedRequest";
import DisplayedReview from "../components/DisplayedReview";
import FeedbackComponent from "../components/FeedbackComponent";

interface Author {
  name: string;
  avatar: string;
}

interface Report {
  author: Author;
  content: string;
  time: string;
  likes: number;
}

interface Review {
  author: Author;
  content: string;
  time: string;
}

const RequestPage = () => {
  const report: Report = {
    author: {
      name: "Stacey McDonald King",
      avatar: "path/to/avatar.jpg",
    },
    content: "Is this a 1 bedroom apartment or shared living space?",
    time: "1d",
    likes: 5,
  };

  const review: Review = {
    author: {
      name: "Amber Taylor",
      avatar: "path/to/avatar.jpg",
    },
    content:
      "yeah it's a single bedroom apartments and it's private not shared",
    time: "18h",
  };

  const handleFeedbackSubmit = (feedback: string) => {
    console.log("Feedback submitted:", feedback);
  };
  return (
    <Box
      sx={{
        margin: "1rem",
      }}
    >
      <DisplayedRequest
        author={report.author}
        content={report.content}
        time={report.time}
        likes={report.likes}
      />
      <DisplayedReview
        author={review.author}
        content={review.content}
        time={review.time}
      />
      <FeedbackComponent onSubmit={handleFeedbackSubmit} />
    </Box>
  );
};

export default RequestPage;
