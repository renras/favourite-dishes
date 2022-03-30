import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: string[];
}

const Select = ({ onChange, options }: Props) => {
  return (
    <TextField
      defaultValue=""
      label="Sort List By Rating"
      select
      onChange={onChange}
      size="small"
      sx={{ width: "200px" }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
