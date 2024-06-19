import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import CustomTextField from "@/core/shared/components/CustomTextField";

interface FeedbackProps {
  onSubmit: (feedback: string) => void;
}

const FeedbackComponent: React.FC<FeedbackProps> = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
      {/* <Box>
        <CustomTextField
          name="feedback"
          label="Feedback"
          value={values.feedback}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.feedback}
          touched={touched.feedback}
          width="100%"
          props={{
            type: "text",
          }}
          multiline
          rows={2}
        />
      </Box> */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default FeedbackComponent;
