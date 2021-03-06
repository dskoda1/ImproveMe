import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import NewEntityForm from '../NewEntityForm';

const NewWorkoutForm = ({ classes, startNew, creating }) => (
  <Paper className={classes.root}>
    <Typography variant="h6">Start a new workout!</Typography>
    <NewEntityForm
      classes={classes}
      onCreate={startNew}
      creating={creating}
      entityName={'Workout Name'}
    />
  </Paper>
);
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(4),
  },
});
NewWorkoutForm.propTypes = {
  startNew: PropTypes.func.isRequired,
  creating: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewWorkoutForm);
