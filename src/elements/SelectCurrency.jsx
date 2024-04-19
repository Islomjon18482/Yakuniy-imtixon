import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { UserContext } from "../App";

function SelectCurrency() {
  const [currency, setCurrency] = useContext(UserContext);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <Select
      sx={{
        color: "white",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "& .MuiSvgIcon-root": {
          color: "white",
        },
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          border: 0,
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: 0,
          },
      }}
      value={currency}
      displayEmpty
      onChange={handleChange}
      inputProps={{ "aria-label": "Without label" }}
    >
      <MenuItem value={"USD"}>USD</MenuItem>
      <MenuItem value={"EUR"}>EUR</MenuItem>
      <MenuItem value={"RUB"}>RUB</MenuItem>
    </Select>
  );
}

export default SelectCurrency;
