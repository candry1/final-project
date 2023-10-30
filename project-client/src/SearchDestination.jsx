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



const SearchDestination = ({ setDestinationCode, updateDestination }) => {
  // const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const { process, cancel } = search(inputValue);

    process((searchResults) => {
      setOptions(searchResults);
    });

    return cancel;
  }, [inputValue]);

  const handleCityChange = (event, newValue) => {
    console.log('newValue: ', newValue);
    if (newValue) {
        setDestinationCode(newValue.code);
        updateDestination(newValue.code); // Update the origin in SubmissionForm
    } else {
        setDestinationCode(null);
        updateDestination(""); // Reset the origin in SubmissionForm
    }
};
  return (
    <div>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) =>
            option.city
              ? `${option.city}, ${option.state || ''}, ${option.country}`
              : ""
          }
        renderInput={(params) => (
            <TextField
            {...params}
            label="Destination City"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifierIcon
                  />
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

export { SearchDestination };
