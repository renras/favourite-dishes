import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import TextField from "@mui/material/TextField";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onChange }: Props) => {
  return (
    <TextField
      id="input-with-icon-textfield"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      placeholder="Search"
      variant="outlined"
      size="small"
    />
  );
};

export default Search;
