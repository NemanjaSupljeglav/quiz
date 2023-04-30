//React
import React from "react";

//MUI
import ButtonMUI from "@mui/material/Button";

const Button = props => {
  const { variant, label, onClick, color, fullWidth, type, disabled, size } =
    props;
  return (
    <ButtonMUI
      disabled={disabled}
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      type={type}
      size={size}
    >
      {label}
    </ButtonMUI>
  );
};

Button.defaultProps = {
  variant: "contained",
  label: "Label",
  onClick: () => {},
  color: "primary",
  fullWidth: false,
  type: "button",
  disabled: false,
  size: "medium"
};

export default Button;
