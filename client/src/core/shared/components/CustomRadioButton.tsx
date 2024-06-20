import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import React from "react";

const CustomRadioButton = ({
  isRequired,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
}: {
  isRequired: boolean;
  name: string;
  label: string;
  value: any;
  onChange: any;
  onBlur: any;
  error: any;
  touched: any;
  options: { id: any; value: string }[];
}) => (
  <FormControl component="fieldset" error={touched && !!error}>
    <FormLabel
      component="legend"
      sx={{
        lineHeight: "1.5",
        fontSize: "0.8rem",
        fontWeight: "600",
        color: "#212B36",
        "&.Mui-focused": {
          color: "#212B36", // Ensure color doesn't change when focused
        },
      }}
    >
      {label}
      {isRequired && " *"}
    </FormLabel>
    <RadioGroup
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      row
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.id}
          value={option.id}
          control={<Radio />}
          label={option.value}
        />
      ))}
    </RadioGroup>
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

export default CustomRadioButton;
