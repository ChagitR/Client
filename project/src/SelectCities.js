import * as React from "react";
import { useState, useEffect } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { getCities } from "./Service/City";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectCities(props) {
  const [cities, setCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const size = props.isAddAd;
  const getCity = async () => {
    const x = await getCities();
    setCityList(x);
  };

  const getDetails = (event) => {
    const {
      target: { value },
    } = event;
    console.log("hh: " + event.target.value);
    setCities(typeof value === "string" ? value.split(",") : value);
    props.getDetails(event, "city");
  };
  useEffect(() => {
    if (props.cities !== null) setCities(props.cities);
    getCity();
    
  });

  return (
    <div>
      <FormControl sx={{maxHeight:70, m: 1, width: size===true ? 300: 200 ,"& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#fe2d61",
              },
            },}}>
        <InputLabel id="demo-multiple-checkbox-label" required>
          עיר
        </InputLabel>
        <Select
        sx={{maxHeight:59}}
          // size="small"
          // style={{ width: "80%" ,left:"10%"}}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          required
          
          value={cities}
          onChange={getDetails}
          input={<OutlinedInput label="עיר" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 ,maxHeight:20}}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {cityList.map((city) => (
            <MenuItem key={city.cityName} value={city.cityName}>
              {/* <Checkbox checked={cities.indexOf(city.cityName) > -1} /> */}
              <ListItemText primary={city.cityName} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{props.nn}</FormHelperText>
      </FormControl>
    </div>
  );
}
