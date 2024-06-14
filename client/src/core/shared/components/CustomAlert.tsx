import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface CustomAlertProps {
  isDanger?: boolean;
  openAlert: boolean;
  msg: string;
  onClose: () => void;
  positionV?: "top" | "bottom";
  positionH?: "left" | "right" | "center";
  duration?: number;
}

const CustomAlert = ({
  isDanger = false,
  openAlert,
  msg,
  onClose,
  positionV = "bottom",
  positionH = "right",
  duration = 6000,
}: CustomAlertProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (openAlert) {
      setOpen(true);
    }
  }, [openAlert]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: positionV,
        horizontal: positionH,
      }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      {!isDanger ? (
        <Alert
          color="success"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {msg === "" ? "Submitted successfuly!" : msg}
        </Alert>
      ) : (
        <Alert
          color="error"
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%", background: "dark-gray" }}
        >
          {msg === "" ? "Something went wrong, try again" : msg}
        </Alert>
      )}
    </Snackbar>
  );
};

export default CustomAlert;
