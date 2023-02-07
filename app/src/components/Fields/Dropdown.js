import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => {
  return {
    set: {
      margin: "32px",
      marginTop: "32px",
      marginBottom: "16px",
    },
    dropStyle: {
      width: "36%",
      float: "right",
      marginRight: "50px",
      display: "inline",
    },
    leftStyle: {
      width: "36%",
      float: "left",
      marginRight: "50px",
      display: "inline",
    },
    
  };
});

const Dropdown = ({
  value,
  data,
  placeholder,
  name,
  onChange,
  iclass,
  takeValue,
  frequired,
}) => {
  const classes = useStyle();
  const handleChange = (event) => {
    onChange(event);
  };
  let dropStyle = (iclass === "dropStyle") ? classes.dropStyle : '';
  dropStyle = (iclass === "leftStyle") ? classes.leftStyle: dropStyle;
  return (

    <div className={`${dropStyle}`}>
      <FormControl >
        <Select
          value={value}
          name={name}
          onChange={handleChange}
          className={classes.set}
          required={frequired===true}
        >
          <MenuItem value="">{placeholder}</MenuItem>
          {data.map((item, key) => (
            <MenuItem key={key} value={(takeValue===true)?item.value : item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

Dropdown.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.array.isRequired,
  iclass: PropTypes.string,
  frequired: PropTypes.bool,
  takeValue: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  iclass: "",
  value: "",
  placeholder: "",
  takeValue: false,
  frequired: true,
};

export default Dropdown;
