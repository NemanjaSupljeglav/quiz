// React
import React from "react";

// Material UI
import DialogMUI from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../atoms/Button";

const Dialog = ({
  opened,
  handleClose,
  title,
  content,
  onAccept,
  size,
  acceptBtnLabel,
  closeBtnLabel,
  disabled
}) => {
  return (
    <div>
      <DialogMUI
        open={opened}
        onClose={() => handleClose()}
        maxWidth={size}
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent dividers style={{ padding: "12px" }}>
          {content}
        </DialogContent>

        <DialogActions>
          <>
            {handleClose && (
              <Button
                onClick={() => handleClose()}
                color="primary"
                label={closeBtnLabel}
                variant="outlined"
              />
            )}
            {onAccept && (
              <Button
                onClick={e => onAccept(e)}
                color="primary"
                label={acceptBtnLabel}
                disabled={disabled}
                variant="contained"
              />
            )}
          </>
        </DialogActions>
      </DialogMUI>
    </div>
  );
};

Dialog.defaultProps = {
  title: "Title",
  handleClose: () => console.log("close"),
  onAccept: () => console.log("accept"),
  content: "Dialog content",
  visible: false,
  closeBtnLabel: "close",
  acceptBtnLabel: "accept",
  size: "lg",
  disabled: false
};

export default Dialog;
