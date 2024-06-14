import { memo } from "react";
import Box from "@mui/material/Box";
import { IconProps, IconColorProps } from "../icon-props";
import { useTheme } from "@mui/material/styles";
// ----------------------------------------------------------------------

const MenuIcon = (props: IconProps) => {
  const theme = useTheme();

  const { primary }: IconProps = IconColorProps(props, theme);

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 34 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="33.6418" height="5.83582" rx="2.91791" fill={primary} />
      <rect
        y="12.7017"
        width="33.6418"
        height="5.83582"
        rx="2.91791"
        fill={primary}
      />
      <rect
        y="25.4028"
        width="33.6418"
        height="5.83582"
        rx="2.91791"
        fill={primary}
      />
    </Box>
  );
};

export default memo(MenuIcon);
