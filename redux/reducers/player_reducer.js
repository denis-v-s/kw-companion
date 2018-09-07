import * as actionTypes from '../actions/types';
import * as constants from '../../constants';

const INITIAL_STATE = {
  fetchingData: false,
  unfilteredPlayerList: {},
  playerList: {},
  activeGames: {},
  stagingRooms: {},
  playerListFilterType: null
};

const playerReducer = (state = INITIAL_STATE, action) => {
  //state = INITIAL_STATE
  
  switch (action.type) {
    // helps identify when the data is being transmitted by the server
    case actionTypes.REQUEST_DATA: {
      return {...state, fetchingData: true}
    }

    // the a complete list of players
    case actionTypes.FETCH_PLAYERS: {
      const playerList = Object.values(action.payload)
      const unfilteredPlayerList = playerList
      return { playerList: playerList, unfilteredPlayerList: unfilteredPlayerList, fetchingData: false }
    }

    // PLAYER LIST FILTERS
    // show only the players that are waiting in the main lobby
    case actionTypes.SHOW_PLAYERS_IN_LOBBY: {
      const filteredList = action.payload.filter(player => player.status === constants.IN_LOBBY)
      return { playerList: filteredList, playerListFilterType: constants.IN_LOBBY, fetchingData: false }
    }

    // show only the players that are currently playing
    case actionTypes.SHOW_PLAYERS_IN_GAME: {
      const filteredList = action.payload.filter(player => player.status === constants.IN_GAME)
      return { playerList: filteredList, playerListFilterType: constants.IN_LOBBY, fetchingData: false }
    }
    
    // show only the players that are currently waiting in a room
    case actionTypes.SHOW_PLAYERS_IN_ROOM: {
      const filteredList = action.payload.filter(player => player.status === constants.IN_ROOM)
      return { playerList: filteredList, playerListFilterType: constants.IN_LOBBY, fetchingData: false }
    }

    // show every player, regardless of wether they are in a room, playing, or in a lobby
    case actionTypes.SHOW_ALL_PLAYERS: {
      return { playerList: filteredList, fetchingData: false }
    }

    default: {
      return state;
    }
  }
};

export default playerReducer;