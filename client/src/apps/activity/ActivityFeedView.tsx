import * as React from 'react';
import {
  createStyles,
  Typography,
  List,
  Divider,
  ListItem,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/types';
import ActivityItemView from './ActivityItemView';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

const useStyles = makeStyles(theme =>
  createStyles({
    list: {
      flexGrow: 1,
      marginTop: '10px',
    },
    icon: {
      margin: '-5px',
    },
    title: {
      marginTop: theme.spacing(3),
    },
    loadingIndicator: {
      marginTop: theme.spacing(3),
    },
    activityTypeFilter: {
      width: '200px',
    },
  })
);

interface ActivityFeedViewProps {}

const ActivityFeedView: React.FunctionComponent<ActivityFeedViewProps> = () => {
  const activityState = useSelector((state: AppState) => state.activityState);
  const activityTypes = activityState.activityTypes.map(at => at.name);
  const [activityFilter, setActivityFilter] = useState('');
  const classes = useStyles();
  let filteredActivity = activityFilter
    ? activityState.activity.filter(
        activity => activity.ActivityType.name === activityFilter
      )
    : activityState.activity;

  return (
    <Grid container justify={'space-around'}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4">Your Recent Activity</Typography>
      </Grid>
      <Grid item xs={9}>
        <Autocomplete
          id="activity-type-filter-autocomplete"
          options={activityTypes}
          getOptionLabel={(option: string) => option}
          onInputChange={(event: any, newValue: string | undefined) => {
            if (newValue === undefined) {
              newValue = '';
            }
            setActivityFilter(newValue);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Filter"
              margin="normal"
              className={classes.activityTypeFilter}
            />
          )}
        />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body1">
          {filteredActivity.length} out of {activityState.activity.length}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List className={classes.list}>
          <Divider />
          <>
            <ListItem>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Name</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1">Tag</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Duration</Typography>
              </Grid>
              <Grid item xs={3}>
                Date
              </Grid>
            </ListItem>
            <Divider />
          </>
          {activityState.fetching && !filteredActivity.length && (
            <CircularProgress size={100} className={classes.loadingIndicator} />
          )}
          {!activityState.fetching &&
            filteredActivity.map(activity => (
              <ActivityItemView key={activity.id} activityItem={activity} />
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ActivityFeedView;
