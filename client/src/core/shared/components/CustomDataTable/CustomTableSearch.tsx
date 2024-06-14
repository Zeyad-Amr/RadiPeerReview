import React, { useRef } from "react";

import {
  Box,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { SearchColumn, SearchQuery } from ".";
import { useTableContext } from "./context";
import AlertService from "../../utils/alert-service";

const CustomTableSearch = () => {
  const { columnHeader, setSearchQuery } = useTableContext();
  const search = useRef("");
  const searchOnRef = useRef<SearchColumn>();

  const searchOptions: SearchColumn[] = [];
  const handleSearchOptions = () => {
    columnHeader.map((item: any) => {
      item.searchable &&
        searchOptions.push({
          columnId: item.id,
          label: item.label,
        });
    });
    return searchOptions;
  };

  console.log(handleSearchOptions());
  const [searchOn, setSearchOn] = React.useState<SearchColumn>();

  const handleChange = (event: SelectChangeEvent) => {
    setSearchOn(
      searchOptions.filter(
        (option) => option.columnId === event.target.value
      )[0]
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputAdornment position="start">
        <SearchRoundedIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            //  document.getElementById("table-search-field")?.focus();
            if (searchOn?.columnId) {
              setSearchQuery({
                columnId: searchOn?.columnId,
                value: search.current,
              } as SearchQuery);
            } else {
              AlertService.showAlert(
                "اختر العمود الذي تريد البحث عنه",
                "error"
              );
            }
          }}
        />
      </InputAdornment>
      <FormControl sx={{ width: "12rem" }} size="small">
        <Select
          displayEmpty
          ref={searchOnRef}
          value={searchOn?.columnId}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected === undefined) {
              return <em>بحـــث عن</em>;
            }

            return searchOptions.filter(
              (option) => option.columnId === selected
            )[0].label;
          }}
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": {
              border: 0,
              borderRight: "1px solid #00000030",
              borderRadius: "0",
            },
          }}
        >
          {searchOptions.map((option: SearchColumn, idx: number) => (
            <MenuItem value={option.columnId} key={idx}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <InputBase
        id="table-search-field"
        sx={{ ml: 1, flex: 1 }}
        placeholder="بحـــث"
        onChange={(e) => {
          search.current = e.target.value;
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (searchOn?.columnId) {
              setSearchQuery({
                columnId: searchOn?.columnId,
                value: search.current,
              } as SearchQuery);
            } else {
              AlertService.showAlert(
                "اختر العمود الذي تريد البحث عنه",
                "error"
              );
            }
          }
        }}
      />
    </Box>
  );
};

export default CustomTableSearch;
