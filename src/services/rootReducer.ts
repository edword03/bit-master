import { combineReducers } from 'redux';
import { crewsReducer } from './crew/crewsReducer';
import { mapReducer } from './map/mapReducer';

export const rootReducer = combineReducers({
  map: mapReducer,
  crew: crewsReducer
});
