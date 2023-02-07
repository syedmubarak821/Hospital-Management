import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => {
  return {
    set: {
      width: "35%",
      margin: theme.spacing(4),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    typeStyle: {
      display: "inline",
    },
    shiftLeft: {
      display: "inline",
      position: "relative",
      right: "155px",
    },
    showTextArea: {
      margin: "20px",
      width: theme.spacing(73),
    },
  };
});

const InputField = ({
  value,
  label,
  placeholder,
  type,
  onChange,
  name,
  iclass,
  frequired,
  ronly,
}) => {
  const classes = useStyle();
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div
      className={iclass === "shiftLeft" ? classes.shiftLeft : classes.typeStyle}
    >
      {type === "textarea" ? (
        <TextField
          label={label !== "" ? label : ""}
          placeholder={placeholder !== "" ? placeholder : ""}
          name={name}
          variant="outlined"
          value={value}
          multiline
          rows={5}
          onChange={handleChange}
          className={classes.showTextArea}
          maxRows={Infinity}
          inputProps={{ readOnly: ronly ? true : false }}
          InputLabelProps={ronly === true ? { shrink: true } : null}
        />
      ) : (
        <TextField
          variant="outlined"
          label={label !== "" ? label : ""}
          placeholder={placeholder !== "" ? placeholder : ""}
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className={classes.set}
          required={frequired === true}
          
          inputProps={{
            style: {fontWeight: "bold"},
            readOnly: ronly ? true : false,
          }}
          InputLabelProps={
            type === "date" || ronly === true ? { shrink: true } : null
          }
        ></TextField>
      )}
    </div>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  frequired: PropTypes.bool,
  ronly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  value: "",
  label: "",
  placeholder: "",
  name: "",
  type: "text",
  frequired: true,
  ronly: false,
};
export default InputField;
