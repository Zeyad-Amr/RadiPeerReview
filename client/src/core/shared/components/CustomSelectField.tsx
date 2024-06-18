import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, SelectChangeEvent } from "@mui/material";
import { ReactNode, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { FormikErrors, FormikTouched } from "formik";

export interface SelectFieldProps<T> {
  onChange: (event: SelectChangeEvent<T> | unknown, child: ReactNode) => void;
  onBlur: (event: React.FocusEvent<{ value: unknown }>) => void;
  name: string;
  label: string;
  error?: string | undefined | FormikErrors<T>;
  touched?: boolean | undefined | FormikTouched<T>;
  value: T | any;
  options: T[];
  defaultValue?: { id: any; value: string };
  isRequired?: boolean;
  width?: number | string;
  hideLabel?: boolean;
  multiple?: boolean;
  sx?: any;
  isDisabled?: boolean;
  placeholder?: string
}

const CustomSelectField = <T extends { id: any; value: string }>({
  onChange,
  onBlur,
  isDisabled = false,
  name,
  label,
  error,
  touched,
  value,
  options = [],
  isRequired = false,
  width,
  sx,
  multiple = false,
  hideLabel = true,
  placeholder
}: SelectFieldProps<T>) => {
  const [selectAll, setSelectAll] = useState(false);

  //* To know if selected all case applied or not
  useEffect(() => {
    if (Array.isArray(value) && value.length === options.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [value, options]);

  //* Handle each selected element style in input field
  const handleSelectedElementStyle = (items: unknown[]) => {
    return items?.map((item: any, index: number) => {
      return (
        <span
          key={index}
          style={{
            backgroundColor: "#003768",
            borderRadius: "4rem",
            color: "#fff",
            padding: "0.5rem 1rem",
            fontSize: "10px",
            margin: "0rem 0.35rem",
          }}
        >
          {item}
        </span>
      );
    });
  };

  //* Handle change of any checkbox including select all checkbox in all cases ( single or multiple checkboxes )
  const handleSelectChange = (event: SelectChangeEvent<T>) => {
    const newValue = event.target.value as any;
    if (multiple && newValue && newValue.includes(0)) {
      const allIds = options.map((option) => option.id);
      setSelectAll(!selectAll);
      onChange(
        {
          target: { name, value: selectAll ? [] : allIds },
        } as unknown as SelectChangeEvent<T>,
        null
      );
    } else {
      onChange(event, null);
    }
  };

  //* Handling appearance of multiple items in input field
  const handleApearanceOfSelectedItems = (
    selectedItems: unknown[],
    itemsNumber: number = 4
  ) => {
    if (selectedItems.length > itemsNumber) {
      let items = [];
      for (let index = 0; index < itemsNumber; index++) {
        items.push(
          options.find((option) => option.id === selectedItems[index])?.value
        );
      }
      return (
        <span style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "#061540",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {selectedItems.length - items.length}+
          </span>
          {handleSelectedElementStyle(items)}
        </span>
      );
    } else {
      return (
        <span style={{ display: "flex", alignItems: "center" }}>
          {handleSelectedElementStyle(
            selectedItems.map(
              (val) => options.find((option) => option.id === val)?.value
            )
          )}
        </span>
      );
    }
  };

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
        sx={{ marginTop: 1.1, width: { width }, maxWidth: "100%", ...sx }}
      >
        <InputLabel disabled={isDisabled}>{label}</InputLabel>

        <Select
          multiple={multiple ?? false}
          label={label}
          onChange={handleSelectChange}
          onBlur={onBlur}
          disabled={isDisabled}
          placeholder={placeholder}
          sx={{
            backgroundColor: "#fff",
            height: "3.5rem",
          }}
          value={multiple ? (Array.isArray(value) ? value : []) : value}
          name={name}
          error={error && touched ? true : false}
          displayEmpty
          renderValue={(selected: unknown) => {
            if (Array.isArray(selected)) {
              return handleApearanceOfSelectedItems(selected);
            }
            const selectedOption = options.find(
              (option) => option.id === selected
            );
            return selectedOption ? selectedOption.value : "";
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {multiple && (
            <MenuItem
              key={0}
              value={0}
              sx={{
                color: "#232836",
                opacity: 0.9,
                transition: "0.5s ease",
                margin: 1,
                ...sx,
                "&.Mui-selected": {
                  backgroundColor: !multiple ? "primary.dark" : "none",
                  color: !multiple ? "#fff" : "#232836",
                  opacity: 0.9,
                },
                "&:hover": {
                  opacity: !multiple ? 0.6 : 0.9,
                  color: "#232836",
                },
                "&.Mui-selected:hover": {
                  opacity: 0.9,
                  backgroundColor: !multiple ? "primary.dark" : "none",
                  color: !multiple ? "#fff" : "#232836",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ListItemText primary="Select All" />
                <Checkbox
                  checked={selectAll}
                  sx={{
                    marginRight: 1,
                    "&.Mui-checked": {
                      color: "primary.dark",
                    },
                  }}
                />
              </Box>
            </MenuItem>
          )}

          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              sx={{
                color: "#232836",
                opacity: 0.9,
                transition: "0.5s ease",
                margin: 1,
                width: multiple ? "98.5%" : "none",
                ...sx,
                "&.Mui-selected": {
                  backgroundColor: !multiple ? "primary.dark" : "none",
                  color: !multiple ? "#fff" : "#232836",
                  opacity: 0.9,
                },
                "&:hover": {
                  opacity: !multiple ? 0.6 : 0.9,
                  color: "#232836",
                },
                "&.Mui-selected:hover": {
                  opacity: 0.9,
                  backgroundColor: !multiple ? "primary.dark" : "none",
                  color: !multiple ? "#fff" : "#232836",
                },
              }}
            >
              <ListItemText primary={option.value} />
              {multiple && (
                <Checkbox
                  checked={Array.isArray(value) && value.includes(option.id)}
                  sx={{
                    marginRight: 1,
                    "&.Mui-checked": {
                      color: "primary.dark",
                    },
                  }}
                />
              )}
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

export default CustomSelectField;
