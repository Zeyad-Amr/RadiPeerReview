import React from "react";
import ReactDOM from "react-dom/client";
import { Alert, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Severity = "error" | "warning" | "info" | "success";

class AlertService {
  static activeAlerts: HTMLDivElement[] = [];

  static showAlert(
    message: React.ReactNode,
    severity: Severity,
    duration: number = 5000,
    customIcon?: React.ReactNode,
    messageStyle?: React.CSSProperties,
    closeIconStyle?: React.CSSProperties
  ) {
    const alertElement = document.createElement("div");
    document.body.appendChild(alertElement);

    const root = ReactDOM.createRoot(alertElement);

    const closeAlert = () => {
      root.unmount();
      alertElement.remove();
      AlertService.activeAlerts = AlertService.activeAlerts.filter(
        (alert) => alert !== alertElement
      );
      AlertService.repositionAlerts();
    };

    AlertService.activeAlerts.push(alertElement);

    const getVerticalOffset = (): number => {
      const alertIndex = AlertService.activeAlerts.indexOf(alertElement);
      return 16 + alertIndex * 55;
    };

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
          top: getVerticalOffset(),
          right: 16,
          zIndex: 9999,
          padding: "0.2rem 0.6rem",
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
    AlertService.repositionAlerts();
  }

  static repositionAlerts() {
    AlertService.activeAlerts.forEach((alert, index) => {
      alert.style.top = `${16 + index * 55}px`;
    });
  }
}

export default AlertService;
