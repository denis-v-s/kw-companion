import { combineReducers } from 'redux'
import playerReducer from './player_reducer'
import roomReducer from './room_reducer'

export default combineReducers({
  player: playerReducer,
  room: roomReducer
})