
declare module "cornerstone-core" {
  const cornerstone: any;
  export default cornerstone;
}

declare module "dicom-parser" {
  const dicomParser: any;
  export default dicomParser;
}

declare module "cornerstone-wado-image-loader" {
  export const wadouri: {
    fileManager: {
      add: (file: File) => string;
    };
  };
}

declare module 'dicom-parser' {
    const dicomParser: any;
    export default dicomParser;
  }
  
  declare module 'cornerstone-core' {
    const cornerstone: any;
    export default cornerstone;
  }
  
  declare module 'cornerstone-wado-image-loader' {
    const cornerstoneWADOImageLoader: any;
    export default cornerstoneWADOImageLoader;
  }
  
  declare module 'cornerstone-math' {
    const cornerstoneMath: any;
    export default cornerstoneMath;
  }
  
  declare module 'cornerstone-tools' {
    const cornerstoneTools: any;
    export default cornerstoneTools;
  }
  
  declare module 'hammerjs' {
    const Hammer: any;
    export default Hammer;
  }

declare module "react-cornerstone-viewport" {
  import { ComponentType, CSSProperties } from "react";

  interface CornerstoneViewportProps {
    tools: any[];
    imageIds: string[];
    imageIdIndex: number;
    isPlaying: boolean;
    frameRate: number;
    className?: string;
    activeTool: string;
    setViewportActive: () => void;
    style?: CSSProperties;
  }

  const CornerstoneViewport: ComponentType<CornerstoneViewportProps>;
  export default CornerstoneViewport;
}
