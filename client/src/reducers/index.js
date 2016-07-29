import { combineReducers } from 'redux';
import app from './appReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  app,
  routing: routerReducer
});

export default rootReducer;
