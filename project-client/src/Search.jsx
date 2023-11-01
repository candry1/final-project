import React, { useEffect, useState } from "react";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";

// import makeStyles from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import PinIcon from "@mui/icons-material/LocationOn";
import MagnifierIcon from "@mui/icons-material/Search";
import clsx from "clsx";
import { search } from "./api";

const Search = ({ setCityCode, updateOrigin }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const { process, cancel } = search(inputValue);

    process((options) => {
      setOptions(options);
    });
    // console.log("Options:", options);
    return cancel;
  }, [inputValue]);

  const handleCityChange = (event, newValue) => {
    if (newValue) {
      setCityCode(newValue.code);
      updateOrigin(newValue.code); // Update the origin in SubmissionForm
    } else {
      setCityCode(null);
      updateOrigin(""); // Reset the origin in SubmissionForm
    }
  };
  return (
    <div>
      <Autocomplete
        autoComplete
        autoHighlight
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) =>
          option.city
            ? `${option.city}, ${option.state || ""}, ${option.country}`
            : ""
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Origin City"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifierIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        onChange={handleCityChange}
      />
    </div>
  );
};

export { Search };
