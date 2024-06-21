import React, { useState, useEffect, ChangeEvent } from "react";
import CornerstoneViewport from "react-cornerstone-viewport";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import axios from "axios";

type ToolConfig = {
  name: string;
  mode: string;
  modeOptions?: {
    mouseButtonMask: number;
  };
};

type Config = {
  activeViewportIndex: number;
  viewports: number[];
  tools: (ToolConfig | string)[];
  imageIds: string[];
  activeTool: string;
  imageIdIndex: number;
  isPlaying: boolean;
  frameRate: number;
};

const initialConfig: Config = {
  activeViewportIndex: 0,
  viewports: [0],
  tools: [
    { name: "Wwwc", mode: "active", modeOptions: { mouseButtonMask: 1 } },
    { name: "Zoom", mode: "active", modeOptions: { mouseButtonMask: 2 } },
    { name: "Pan", mode: "active", modeOptions: { mouseButtonMask: 4 } },
    "Length",
    "Angle",
    "Bidirectional",
    "FreehandRoi",
    "Eraser",
    { name: "StackScrollMouseWheel", mode: "active" },
    { name: "PanMultiTouch", mode: "active" },
    { name: "ZoomTouchPinch", mode: "active" },
    { name: "StackScrollMultiTouch", mode: "active" },
  ],
  imageIds: [],
  activeTool: "Wwwc",
  imageIdIndex: 0,
  isPlaying: false,
  frameRate: 1,
};

const DicomViewer = () => {
  const [config, setConfig] = useState<Config>(initialConfig);
  const [isImageIDs, setIsImageIDs] = useState<boolean>(false);

  // get url params
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    // get file url from url params
    const fileUrl = params.get("file");
    console.log("fileUrl", fileUrl);

    getDicomImage(fileUrl ?? "");
  }, []);

  const getDicomImage = (fileUrl: string) => {
    axios
      .get(fileUrl, {
        responseType: "blob",
      })
      .then((res: any) => {
        console.log(res, "res");
        if (res) {
          const file = new File([res.data], "dicom.dcm", {
            type: "application/dicom",
          });

          const imageId =
            cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
          console.log(imageId, "imageId");

          setConfig((prevConfig) => ({
            ...prevConfig,
            imageIds: [...prevConfig.imageIds, imageId],
          }));
        }
      });
  };

  useEffect(() => {
    if (config.imageIds.length > 0) {
      setIsImageIDs(true);
    }
  }, [config.imageIds]);

  return (
    <>
      {isImageIDs &&
        config.imageIds &&
        config.viewports.map((viewportIndex) => (
          <div
            key={viewportIndex}
            style={{ flex: "1", display: "flex", flexDirection: "row" }}
          >
            <CornerstoneViewport
              style={{ flex: "1", width: "100%", height: "100vh" }}
              tools={config.tools}
              imageIds={config.imageIds}
              imageIdIndex={config.imageIdIndex}
              isPlaying={config.isPlaying}
              frameRate={config.frameRate}
              className={
                config.activeViewportIndex === viewportIndex ? "active" : ""
              }
              activeTool={config.activeTool}
              setViewportActive={() => {
                setConfig((prevConfig) => ({
                  ...prevConfig,
                  activeViewportIndex: viewportIndex,
                }));
              }}
            />
          </div>
        ))}
    </>
  );
};

export default DicomViewer;
