import React, { createContext, useState } from "react";

interface SidebarContextProps {
  collapsed: boolean;
  onCollapse: () => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  collapsed: false,
  onCollapse: () => {},
});

export const SidebarContextProvider = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        onCollapse,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};
