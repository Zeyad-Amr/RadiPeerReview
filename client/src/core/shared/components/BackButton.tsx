import { Button, Typography } from "@mui/material";
import BackArrow from "@mui/icons-material/ArrowBackIosNew";

const BackButton = () => {
  return (
    <Button
      variant="text"
      sx={{
        padding: 0.5,
        marginRight: 3,
        width: 100,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      onClick={() => {
        window.history.back();
      }}
    >
      <BackArrow sx={{ fontSize: 15 }} />
      <Typography
        variant="h6"
        sx={{
          marginLeft: 1,
        }}
      >
        Back
      </Typography>
    </Button>
  );
};

export default BackButton;
