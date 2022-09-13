import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";

function AddTeeTime({username}) {
  return(
    <AppBar position="static">
      <Toolbar>
        <Grid 
          container
          justifyContent="center"
          alignItems="center"
          >
            <Grid item>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome {username}!
              </Typography>
            </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default AddTeeTime;