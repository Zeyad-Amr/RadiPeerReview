import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormikErrors, FormikTouched } from "formik";

// export interface MultiSelectFieldProps {
//   onChange: (event: SelectChangeEvent<string[]>, child: ReactNode) => void;
//   onBlur: (event: React.FocusEvent<{ value: unknown }>) => void;
//   name: string;
//   label: string;
//   error: string | string[] | undefined;
//   touched: boolean | undefined;
//   value: string[];
//   options: ProductOption[];
//   isRequired?: boolean;
//   width?: number;
// }

export interface MultiSelectFieldProps<T> {
  onChange: (event: SelectChangeEvent<T[]>, child: ReactNode) => void;
  onBlur: (event: React.FocusEvent<{ value: unknown }>) => void;
  name: string;
  label: string;
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  touched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  value: T[] | undefined;
  options: T[];
  isRequired?: boolean;
  width?: number | string;
  hideLabel?: boolean;
}

const CustomMultiSelectField = <T extends { id: any; value: string }>({
  onChange,
  onBlur,
  name,
  label,
  error,
  touched,
  value,
  options,
  isRequired = false,
  width,
  hideLabel = true,
}: MultiSelectFieldProps<T>) => {
  const selectedValues = Array.isArray(value) ? value : [];

  // delete items from view

  // const handleDelete = (chipId: any, event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   const updatedValues = selectedValues.filter((val) => val !== chipId);
  //   console.log(updatedValues);

  //   onChange(
  //     {
  //       target: {
  //         value: updatedValues,
  //         name: name,
  //       },
  //     } as SelectChangeEvent<T[]>,
  //     null
  //   );
  // };

  return (
    <Box
      sx={{
        mb: 2,
        width: width,
        maxWidth: "100%",
      }}
    >
      {!hideLabel && (
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: "0.9rem !important",
            margin: "0rem 0.5rem",
          }}
        >
          {label} {isRequired && <span style={{ color: "#FF5630" }}>*</span>}
        </Typography>
      )}

      <FormControl
        required={isRequired}
        sx={{ marginTop: 1.1, width: { width }, maxWidth: "100%" }}
      >
        <InputLabel>{label}</InputLabel>

        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          label={label}
          onChange={(event: SelectChangeEvent<T[]>, child: ReactNode) => {
            onChange(event, child);
            console.log(event.target.value);
          }}
          onBlur={onBlur}
          multiple
          value={selectedValues}
          hidden={hideLabel}
          name={name}
          error={error && touched ? true : false}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                color: "primary.dark",
              }}
            >
              {options
                .filter((val) => selected.includes(val.id))
                .map((item) => (
                  <Chip
                    key={item.id}
                    label={item.value}
                    // onDelete={(event) => handleDelete(item.id, event)}
                    sx={{
                      "& .MuiChip-label": {
                        color: "#fff",
                      },
                      cursor: "pointer",
                      backgroundColor: "primary.dark",
                    }}
                  />
                ))}
            </Box>
          )}
          sx={{
            backgroundColor: "#fff ",
            height: "3.5rem",
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{
                borderRadius: 25,
                opacity: 0.8,
                color: "#232836",
                transitionDuration: "0.5s ease",
                margin: 1,
                "&.Mui-selected": {
                  backgroundColor: "primary.dark",
                  color: "#fff",
                },
              }}
            >
              {option.value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          sx={{
            color: "#FF5630",
            fontSize: "12px",
          }}
        >
          {error && touched ? String(error) : null}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CustomMultiSelectField;
