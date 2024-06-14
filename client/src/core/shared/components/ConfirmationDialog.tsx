import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  Breakpoint,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import PrimaryButton from "./btns/PrimaryButton";
import SecondaryButton from "./btns/SecondaryButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog(props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  maxWidth?: false | Breakpoint;
  title: string;
  contentMessage: string;
  confirmFunction: () => void;
}) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={props.open}
        fullWidth
        maxWidth={props.maxWidth ?? "sm"}
      >
        <Box
          sx={{
            backgroundColor: "primary.dark",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogTitle
            sx={{ m: 0, p: 2, color: "white", fontWeight: "600" }}
            id="dialog-title"
          >
            {props.title}
          </DialogTitle>
        </Box>
        <DialogContent dividers>
          <Box sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
            {props.contentMessage}
          </Box>
        </DialogContent>
        <DialogActions sx={{ margin: "0.3rem 0.8rem" }}>
          <PrimaryButton
            title="تأكيد"
            onClick={() => props.confirmFunction()}
          />
          <SecondaryButton title="الغاء" onClick={handleClose} />
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
