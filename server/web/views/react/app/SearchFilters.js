// @flow
import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Paper, Grid } from "@material-ui/core";
import DatePicker from "../common/DatePicker";

type $Props = { classes: any, children: React$Element<*> };

const SearchFilters = (props: $Props) => {
  const { classes, children } = props;

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container justify="center" spacing={2} className={classes.root}>
          <Grid className={classes.dataPicker}>
            <DatePicker label="After" />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2} className={classes.root}>
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Grid>
        {children}
      </Paper>
    </Fragment>
  );
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: { padding: theme.spacing(2), margin: theme.spacing(2) },
  datePicker: { margin: theme.spacing(2) },
});

export default withStyles(styles)(SearchFilters);
