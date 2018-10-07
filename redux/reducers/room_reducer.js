import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
  fetchingData: false,
  activeGames: {},
  stagingRooms: {},
  roomData: null
};

const roomReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.REQUESTING_ROOM_DATA: {
      return {...state, fetchingData: true}
    }

    case actionTypes.FETCH_ROOMS: {
      return {
        ...state,
        activeGames: action.activeGames,
        stagingRooms: action.stagingRooms,
        fetchingData: false
      }
    }

    case actionTypes.GET_ROOM_DATA_BY_PLAYER_ID: {
      const roomList = Object.values(state.stagingRooms).concat(Object.values(state.activeGames));
      const roomData = roomList.find(room =>
        room.players.find(player => player.id === action.playerId)
      );

      return {
        ...state,
        roomData
      };
    }

    case actionTypes.GET_ROOM_DATA_BY_ROOM_ID: {
      const roomList = Object.values(state.stagingRooms).concat(Object.values(state.activeGames));
      const roomData = roomList.find(room => room.id === action.roomId);
      return {
        ...state,
        roomData
      };
    }

    default: {
      return state;
    }
  }

}

export default roomReducer;