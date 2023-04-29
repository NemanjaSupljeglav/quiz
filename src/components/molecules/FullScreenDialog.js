// React
import React from "react";

// Material UI
import DialogMUI from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

//Atoms
import Button from "../atoms/Button";
import TooltipIconButton from "../atoms/TooltipIconButton";

//Functions
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = props => {
  const { opened, handleClose, title, content, onAccept, label } = props;
  return (
    <>
      <DialogMUI
        fullScreen
        open={opened}
        onClose={() => handleClose()}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <TooltipIconButton
              tooltipTxt="Close"
              handleClick={() => handleClose()}
              icon={<CloseIcon />}
            />

            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            <Button autoFocus onClick={e => onAccept(e)} label={label} />
          </Toolbar>
        </AppBar>

        <DialogContent dividers>{content}</DialogContent>
      </DialogMUI>
    </>
  );
};

FullScreenDialog.defaultProps = {
  opened: false,
  title: "Title",
  handleClose: () => console.log("close"),
  onAccept: () => console.log("accept"),
  content: "Dialog content",
  visible: false,
  edit: false,
  label: "Accept"
};

export default FullScreenDialog;
