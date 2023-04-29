// React
import React, { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";

const Input = props => {
  const {
    type,
    value,
    label,
    validation,
    onChange,
    required,
    disabled,
    multiline,
    rows,
    rowsMax,
    step,
    shrink,
    variant,
    warning,
    inputComponent
  } = props;

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
      required={required}
      error={validation}
      InputLabelProps={{ shrink }}
      onChange={e => {
        onChange(e?.target?.value);
      }}
      InputProps={{
        inputComponent,
        step,
        style: warning ? { color: "red" } : null
      }}
    />
  );
};

Input.defaultProps = {
  label: "Label",
  type: "text",
  value: "",
  error: false,
  required: false,
  disabled: false,
  dataCy: null,
  variant: "standard",
  InputLabelProps: { shrink: false },
  warning: false,
  inputComponent: "input",
  amountType: false,
  multiline: false
};

export default Input;
