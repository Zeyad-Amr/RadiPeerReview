import { Typography } from "@mui/material";

const PageTitle = ({
  title,
  fontSize = "h3",
  sx
}: {
  title: string;
  fontSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  sx?: any;
}) => {
  return (
    <Typography
      variant={fontSize}
      sx={{
        fontWeight: "bold",
        marginBottom: "20px",
        color: "primary.main",
        ...sx
      }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
