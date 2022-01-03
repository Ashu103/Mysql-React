import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Doctor from "./Doctor";
import { Link } from "react-router-dom";
const StateDropdown = () => {
  const [city, setCity] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/state").then((response) => {
      setCity(response.data);
      console.log(response.data);
    });
  }, []);

  const handleChange = (event) => {
    history.push(`/doctors/${event.target.value}`);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="City"
          onChange={handleChange}
        >
          {city.map((value, key) => {
            console.log(value.statename);
            return (
              <MenuItem key={key} value={value.id}>
                {value.statename}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default StateDropdown;
