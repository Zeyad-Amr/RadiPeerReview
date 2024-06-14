import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Breakpoint, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

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

export default function CustomizedDialog(props: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  maxWidth?: false | Breakpoint;
  title?: string;
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
            padding: "0.2rem 0.5rem",
          }}
        >
          {props.title ? (
            <DialogTitle
              sx={{ m: 0, p: 2, color: "white", fontWeight: "600" }}
              id="dialog-title"
            >
              {props.title}
            </DialogTitle>
          ) : null}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              margin: "0.5rem 0",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent  dividers>
          <Box>{props.children}</Box>
        </DialogContent>
        {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
      </BootstrapDialog>
    </>
  );
}
