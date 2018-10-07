import * as actionTypes from './types';
import { fetchDataAsync } from '../../api';

export const fetchRoomsAsync = () => async dispatch => {
  dispatch({ type: actionTypes.REQUESTING_ROOM_DATA })
  const data = await fetchDataAsync();

  try {
    //const roomData = (roomType === ACTIVE_MATCH) ? data.activeGames : data.stagingRooms
    dispatch({
      type: actionTypes.FETCH_ROOMS,
      activeGames: data.activeGames,
      stagingRooms: data.stagingRooms
    })
  } catch (err) {
    dispatch({ type: actionTypes.DATA_REQUEST_ERROR, error: err.message })
  }
}

export const getRoomDataByPlayerId = (playerId) => dispatch => {
  dispatch({ type: actionTypes.GET_ROOM_DATA_BY_PLAYER_ID, playerId });
}

export const getRoomDataByRoomId = (roomId) => dispatch => {
  dispatch({ type: actionTypes.GET_ROOM_DATA_BY_ROOM_ID, roomId });
}