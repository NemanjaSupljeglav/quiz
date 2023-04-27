// React
import React from "react";

// MUI
import ButtonMUI from "@mui/material/Button";
import Icon from "@mui/material/Icon";

const Button = props => {
  const {
    variant,
    label,
    onClick,
    color,
    icon,
    fullWidth,
    type,
    disabled,
    customStyle,
    startIcon,
    classes,
    size
  } = props;

  return (
    <ButtonMUI
      disabled={disabled}
      variant={variant}
      color={color}
      onClick={onClick}
      endIcon={icon && <Icon>{icon}</Icon>}
      startIcon={startIcon && <Icon>{startIcon}</Icon>}
      fullWidth={fullWidth}
      type={type}
      style={customStyle}
      classes={classes}
      size={size}
    >
      {label}
    </ButtonMUI>
  );
};

Button.defaultProps = {
  variant: "contained",
  label: "Label",
  onClick: () => console.log("Ouch!"),
  color: "primary",
  goTo: "",
  icon: "",
  startIcon: "",
  fullWidth: false,
  type: "button",
  disabled: false,
  customStyle: {},
  classes: {},
  size: "medium"
};

export default Button;
