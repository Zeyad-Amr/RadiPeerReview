import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ClearRounded } from "@mui/icons-material";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  margin: "1.5rem 0rem",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#0f70f2",
  background: "linear-gradient(-30deg,#0a63d9, #0054a6)",
  borderTopRightRadius: "6px",
  borderTopLeftRadius: "6px",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface CustomAccordionProps {
  children: React.ReactNode;
  title: string;
  isExpanded: boolean;
  setExpanded: (value: boolean) => void;
  isDisabled: boolean;
  isClosable: boolean;
  handleClosed?: () => void;
}

export default function CustomAccordion({
  children,
  title,
  isExpanded,
  setExpanded,
  isDisabled,
  isClosable,
  handleClosed,
}: CustomAccordionProps) {
  const handleChange = () => {
    setExpanded(!isExpanded);
  };

  return (
    <>
      <Accordion
        disabled={isDisabled}
        expanded={isExpanded}
        onChange={() => handleChange()}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <ClearRounded
            sx={{
              display: isClosable ? "block" : "none",
              position: "absolute",
              right: "0.7rem !important",
            }}
            onClick={handleClosed}
          />
          <Typography>{title}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
