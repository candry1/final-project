import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { InputAdornment, TextField } from "@mui/material";
// import makeStyles from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import MagnifierIcon from "@mui/icons-material/Search";
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
    console.log("newValue: ", newValue);
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
        // inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          const firstWord = newInputValue.split(',')[0];
          const withoutComma = firstWord.replace(',', ''); // Remove comma if present
          setInputValue(withoutComma);
        }}
        getOptionLabel={(option) =>
          option.city
            ? `${option.city}, ${option.state || ""}, ${option.country}`
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

SearchDestination.propTypes = {
  setDestinationCode: PropTypes.func, // Define PropTypes for setDestinationCode
  updateDestination: PropTypes.func.isRequired, // Define PropTypes for updateDestination
};

export { SearchDestination };
