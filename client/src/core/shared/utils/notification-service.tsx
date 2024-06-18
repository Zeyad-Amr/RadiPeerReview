import React from "react";
import ReactDOM from "react-dom/client";
import { toast, ToastContainer, ToastOptions, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Severity = "error" | "warning" | "info" | "success" | "default";

class NotificationService {
  static containerId: string = "toast-container";

  static init() {
    const containerElement = document.createElement("div");
    containerElement.id = NotificationService.containerId;
    document.body.appendChild(containerElement);
    const root = ReactDOM.createRoot(containerElement);

    root.render(
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    );
  }

  static showNotification(
    message: React.ReactNode,
    severity: Severity = "default",
    customIcon?: React.ReactNode,
    messageStyle?: React.CSSProperties,
    closeIconStyle?: React.CSSProperties
  ) {
    toast(
      ({ closeToast }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {customIcon && <div>{customIcon}</div>}
          <Typography
            style={{
              margin: "0rem 1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...messageStyle,
            }}
          >
            {message}
          </Typography>
          <IconButton
            onClick={closeToast}
            style={{ ...closeIconStyle, marginLeft: "auto" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ),
      {
        type: severity,
        closeButton: false,
      } as ToastOptions
    );
  }
}

export default NotificationService;
