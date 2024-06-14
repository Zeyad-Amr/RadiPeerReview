export interface IconProps {
  primary?: string;
  secondary?: string;
}

export const IconColorProps = (
  { primary, secondary }: IconProps,
  theme: any
) => {
  return {
    primary: primary || theme.palette.primary.main,
    secondary: secondary || theme.palette.secondary.main,
  };
};
