import { Typography } from "@mui/material";

const PageTitle = ({
  title,
  fontSize = "h3",
}: {
  title: string;
  fontSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  return (
    <Typography
      variant={fontSize}
      sx={{
        fontWeight: "bold",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
