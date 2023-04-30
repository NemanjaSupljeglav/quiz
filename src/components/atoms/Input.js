//React
import React from "react";

//MUI
import TextField from "@mui/material/TextField";

const Input = props => {
  const {
    type,
    value,
    label,
    validation,
    onChange,
    disabled,
    multiline,
    rows,
    rowsMax,
    variant
  } = props;
  const handleChange = e => {
    onChange && onChange(e?.target?.value);
  };

  return (
    <TextField
      multiline={multiline}
      rows={rows}
      maxRows={rowsMax}
      size="small"
      variant={variant}
      margin="dense"
      fullWidth
      disabled={disabled}
      type={type}
      label={label}
      value={value}
      error={validation}
      onChange={handleChange}
    />
  );
};

Input.defaultProps = {
  type: "text",
  value: "",
  label: "Label",
  validation: false,
  onChange: () => {},
  disabled: false,
  multiline: false,
  variant: "standard"
};

export default Input;
