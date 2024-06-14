import React from "react";
import ReactDOM from "react-dom/client";
import { Alert, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

class AlertService {
  static activeAlerts = 0;

  static showAlert(
    message: React.ReactNode,
    severity: "error" | "warning" | "info" | "success",
    duration: number = 5000,
    customIcon?: React.ReactNode,
    messageStyle?: React.CSSProperties,
    closeIconStyle?: React.CSSProperties
  ) {
    const alertElement = document.createElement("div");
    document.body.appendChild(alertElement);

    const root = ReactDOM.createRoot(alertElement);

    const verticalOffset = AlertService.activeAlerts * 55;

    const closeAlert = () => {
      root.unmount();
      alertElement.remove();
      AlertService.activeAlerts--;
    };

    AlertService.activeAlerts++;

    root.render(
      <Alert
        severity={severity}
        icon={customIcon}
        action={
          <IconButton
            onClick={closeAlert}
            style={{ ...closeIconStyle, marginTop: "-0.3rem" }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 16 + verticalOffset,
          right: 16,
          zIndex: 9999,
          padding: "0.2rem",
        }}
        onClose={closeAlert}
      >
        <Typography
          sx={{
            margin: "0rem 1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...messageStyle,
          }}
        >
          {message}
        </Typography>
      </Alert>
    );

    setTimeout(closeAlert, duration);
  }
}

export default AlertService;
