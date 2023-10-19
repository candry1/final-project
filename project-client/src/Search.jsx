import React, { useEffect, useState } from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
// import makeStyles from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import PinIcon from "@mui/icons-material/LocationOn";
import MagnifierIcon from "@mui/icons-material/Search";
import clsx from "clsx";
import { search } from "./api";



const Search = ({ setCityCode }) => {
  // const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const { process, cancel } = search(inputValue);
    console.log('process: ', process);

    process((searchResults) => {
      setOptions(searchResults);
    });

    return cancel;
  }, [inputValue]);
  return (
    <div>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.city || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        onChange={(event, newValue) => {
          setCityCode(newValue.code);
        }}
      />
    </div>
  );
};

export { Search };
