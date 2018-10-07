import { combineReducers } from 'redux';
import appReducer from './app_reducer';
import playerReducer from './player_reducer';
import roomReducer from './room_reducer';
import mapReducer from './map_reducer';

export default combineReducers({
  app: appReducer,
  player: playerReducer,
  room: roomReducer,
  map: mapReducer,
});