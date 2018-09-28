import { combineReducers } from "redux";

import todaysMatches from './todays_matches';
import matches from './matches';
import auth from './auth';

export default combineReducers({
  todaysMatches,
  matches,
  auth,
})