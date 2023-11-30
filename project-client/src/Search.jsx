import { useEffect, useState } from "react";
import { InputAdornment, TextField, CircularProgress} from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes

// import makeStyles from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import MagnifierIcon from "@mui/icons-material/Search";
import { search } from "./api";

const Search = ({ setCityCode, updateOrigin, setCityName, cityName }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const initiateSearch = async () => {
      setLoading(true); // Set loading to true when starting the search
      const { process, cancel } = search(inputValue);
      process((searchResults) => {
        setOptions(searchResults);
        setLoading(false);
      });

      // After search is complete, set loading to false
      setLoading(false);
    };

    // If there's an inputValue, initiate the search
    if (inputValue) {
      initiateSearch();
    } else {
      // If inputValue is empty, reset options and loading
      setOptions([]);
      setLoading(false);
    }

    // Cleanup function
    return () => {
      setLoading(false); // Set loading to false if component is unmounted
    };
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
        // inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          const firstWord = newInputValue.split(',')[0];
          const withoutComma = firstWord.replace(',', ''); // Remove comma if present
          setInputValue(withoutComma);
        }}
        getOptionLabel={(option) => {
          return option.city
            ? `${option.city}, ${option.state || ""}, ${option.country}`
            : "";
        }
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
      {loading && <CircularProgress size={24} />}
    </div>
  );
};

Search.propTypes = {
  setCityCode: PropTypes.func, // Define PropTypes for setCityCode as a function
  updateOrigin: PropTypes.func.isRequired, // Define PropTypes for updateOrigin as a function
};


export { Search };
