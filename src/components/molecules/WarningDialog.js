//React
import React from "react";

//Material UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

//Atoms
import Button from "../atoms/Button";

//Functions
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WarningDialog = props => {
  const {
    opened,
    title,
    handleClose,
    onAccept,
    content,
    closeLabel,
    acceptLabel
  } = props;

  return (
    <div>
      <Dialog
        open={opened}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <WarningAmberIcon
            color="error"
            style={{ position: "relative", top: "5px", right: "10px" }}
          />
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} label={closeLabel} variant="outlined" />
          <Button onClick={onAccept} label={acceptLabel} color="error" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

WarningDialog.defaultProps = {
  opened: false,
  title: "Title",
  handleClose: () => console.log("close"),
  onAccept: () => console.log("accept"),
  content: "Dialog content",
  closeLabel: "Close",
  acceptLabel: "Accept"
};

export default WarningDialog;
