import { Box } from "@mui/system";
import React, { ReactNode, useState } from "react";

interface Tab {
  name: string;
  content: ReactNode;
}

interface TabsProps {
  Tabs: Tab[];
}

const Tabs = ({ Tabs }: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Box>
      <Box sx={{ display: "flex", width: "95%", margin: "0rem auto" }}>
        {Tabs.map((Tab: Tab, idx: number) => (
          <Box
            key={idx}
            sx={{
              borderBottomLeftRadius: idx === 0 ? "5px" : 0,
              borderBottomRightRadius: idx === Tabs.length - 1 ? "5px" : 0,
              width: "100%",
              backgroundColor: idx === activeTabIndex ? "primary.main" : "#fff",
              color: idx === activeTabIndex ? "white" : "primary.dark",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: idx === activeTabIndex ? "default" : "pointer",
              transition: "0.1s ease-in-out",
              padding: "0.6rem 0",
            }}
            onClick={() => setActiveTabIndex(idx)}
          >
            {Tab.name}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: "95%",
          margin: "0.7rem auto",
          padding: " 1rem",
          backgroundColor: "#fff",
          borderRadius: "5px",
          height: "70vh",
          overflowY: "auto",
        }}
      >
        {Tabs[activeTabIndex].content}
      </Box>
    </Box>
  );
};

export default Tabs;
