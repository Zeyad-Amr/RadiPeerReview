import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Box } from "@mui/system";
import { FormControl, FormHelperText } from "@mui/material";
export interface CustomTextFieldProps {
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
  value: any;
  multiline?: boolean | undefined;
  maxLength?: number;
  rows?: number;
  isRequired?: boolean;
  width?: number | string;
  hideLabel?: boolean;
  props?: TextFieldProps;
  sx?:any
}

const CustomTextField = ({
  onChange,
  onBlur,
  hideLabel = false,
  name,
  label,
  error,
  touched,
  value,
  maxLength,
  props,
  isRequired = false,
  width,
  multiline,
  rows,
  sx
}: CustomTextFieldProps) => {
  const textfieldProps = {
    FormHelperTextProps: { sx: { color: "red" } },
    InputProps: { sx: { backgroundColor: "white" } },
    InputLabelProps: { shrink: true },
  };
  return (
    <Box
      sx={{
        "& .MuiTextField-root": {
          maxWidth: "100%",
        },
        width: width,
        margin: "0.7rem 0rem",
        maxWidth: "100%",
        ...sx
      }}
    >
      {/* {!hideLabel && (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )} */}
      <FormControl
        required={isRequired}
        sx={{ width: { width }, maxWidth: "100%" }}
      >
        <TextField
          multiline={multiline ? true : false}
          rows={rows}
          sx={{
            width: width,
            backgroundColor: "#e7e7e7 !important",
            borderRadius: "10px",
          }}
          // id="outlined-required"
          label={label}
          required={isRequired}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          hiddenLabel={hideLabel}
          error={!!(error && touched)}
          {...(!hideLabel && textfieldProps)}
          {...props}
          inputProps={{ maxLength: maxLength }}
        />
        <FormHelperText
          sx={{
            color: "#FF5630",
          }}
        >
          {error && touched ? error : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CustomTextField;
