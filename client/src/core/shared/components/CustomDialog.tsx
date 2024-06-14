import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface CustomDialogProps {
  isDanger?: boolean;
  openDialog: boolean;
  title: string;
  content: string;
  agreeButtonText: string;
  disagreeButtonText: string;
  onAgree: () => void;
  onDisagree: () => void;
  onClose: () => void;
}

const CustomDialog = ({
  isDanger = false,
  openDialog,
  title,
  content,
  agreeButtonText,
  disagreeButtonText,
  onAgree,
  onDisagree,
  onClose,
}: CustomDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (openDialog) {
      setOpen(true);
    }
  }, [openDialog]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          color={isDanger ? "error" : "primary"}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              onDisagree();
            }}
            color="primary"
          >
            {disagreeButtonText}
          </Button>
          <Button
            onClick={() => {
              handleClose();
              onAgree();
            }}
            autoFocus
            color={isDanger ? "error" : "primary"}
          >
            {agreeButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
