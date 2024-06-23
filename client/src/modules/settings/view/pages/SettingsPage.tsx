import { Box, Grid, Switch, Typography, Paper } from "@mui/material";
import { SettingsState } from "../../controllers/types";
import { RootState, useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  getAssignmentMode,
  toggleAssignmentMode,
} from "../../controllers/thunks/settings-thunk";
import { useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SettingsPage = () => {
  const settingsState: SettingsState = useAppSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAssignmentMode());
  }, [dispatch]);

  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        color="primary"
        sx={{
          marginBottom: "2rem",
          width: "100%",
        }}
      >
        Settings
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" alignItems="center">
            <AssignmentIcon color="primary" sx={{ marginRight: "1rem" }} />
            <Typography variant="h5">Assignment Mode</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ marginBottom: "1rem" }}
            >
              Toggle between automatic and manual assignment modes for review
              requests.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">Automatic Assignment</Typography>
              <Switch
                checked={settingsState.isAutoAssignMode}
                onClick={() => dispatch(toggleAssignmentMode())}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
