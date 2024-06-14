import React from "react";
import ReactDOM from "react-dom/client";
import { Box, Typography } from "@mui/material";
import { SyncLoader } from "react-spinners";

class LoadingService {
  static activeLoaders = 0;
  static loadingElement: HTMLElement | null = null;

  static showLoading() {
    if (LoadingService.activeLoaders === 0) {
      LoadingService.loadingElement = document.createElement("div");
      document.body.appendChild(LoadingService.loadingElement);
      const root = ReactDOM.createRoot(LoadingService.loadingElement);
      root.render(
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "10rem",
            }}
          >
            <Box sx={{ display: "flex" }}>
              {/* <Box
                component="img"
                src="https://i.postimg.cc/J4VLnwfN/loading.png"
                sx={{
                  width: "8rem",
                  mb: 3,
                  animation: "grow 0.6s infinite alternate",
                  "@keyframes grow": {
                    from: {
                      transform: "scale(1)",
                    },
                    to: {
                      transform: "scale(1.1)",
                    },
                  },
                }}
              /> */}

              <Box
                sx={{
                  display: "flex",
                  margin: "4rem 2rem",
                  animation: "grow 0.6s infinite alternate",
                  "@keyframes grow": {
                    from: {
                      transform: "scale(1)",
                    },
                    to: {
                      transform: "scale(1.1)",
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "4rem",
                    color: "info.main",
                  }}
                >
                  Radi
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "3rem",
                    color: "white",
                  }}
                >
                  PeerReview
                </Typography>
              </Box>
            </Box>
            <SyncLoader color={"#fff"} loading={true} />
          </Box>
        </Box>
      );
    }
    LoadingService.activeLoaders++;
  }

  static hideLoading() {
    LoadingService.activeLoaders--;
    if (LoadingService.activeLoaders === 0 && LoadingService.loadingElement) {
      const root = ReactDOM.createRoot(LoadingService.loadingElement);
      root.unmount();
      LoadingService.loadingElement.remove();
    }
  }
}

export default LoadingService;
