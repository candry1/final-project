import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { InputAdornment, TextField, CircularProgress} from "@mui/material";
// import makeStyles from "@mui/styles";
import Autocomplete from "@mui/material/Autocomplete";
import MagnifierIcon from "@mui/icons-material/Search";
import { search } from "./api";

const SearchDestination = ({ setDestinationCode, updateDestination }) => {
  // const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

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
      {loading && <CircularProgress size={24} />}
    </div>
  );
};

SearchDestination.propTypes = {
  setDestinationCode: PropTypes.func, // Define PropTypes for setDestinationCode
  updateDestination: PropTypes.func.isRequired, // Define PropTypes for updateDestination
};

export { SearchDestination };
