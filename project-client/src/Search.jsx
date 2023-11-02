import { useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes

// import makeStyles from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import MagnifierIcon from "@mui/icons-material/Search";
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

Search.propTypes = {
  setCityCode: PropTypes.func, // Define PropTypes for setCityCode as a function
  updateOrigin: PropTypes.func.isRequired, // Define PropTypes for updateOrigin as a function
};


export { Search };
