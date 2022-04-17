import { combineReducers } from 'redux';
import { crewsReducer } from './crew/crewsReducer';
import { mapReducer } from './map/mapReducer';
import { inputReducer } from './input/inputReducer';

export const rootReducer = combineReducers({
  map: mapReducer,
  crew: crewsReducer,
  input: inputReducer,
});
