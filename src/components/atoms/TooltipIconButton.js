// React
import React from "react";

// MUI
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const TooltipIconButton = props => {
  const { tooltipTxt, handleClick, icon, disabled, color } = props;
  return (
    <Tooltip arrow title={tooltipTxt}>
      <IconButton onClick={handleClick} disabled={disabled} color={color}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

TooltipIconButton.defaultProps = {
  tooltipTxt: "",
  handleClick: () => {},
  icon: {},
  disabled: false,
  color: "inherit"
};

export default TooltipIconButton;
