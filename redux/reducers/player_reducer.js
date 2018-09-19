import * as actionTypes from '../actions/types';
import { WebBrowser } from 'expo';

const INITIAL_STATE = {
  fetchingData: false,
  playerList: {},
  activeGames: {},
  stagingRooms: {},
  activeFitler: null,
  showPlayerModal: false,
  showPlayerListOptionsBar: false
};

const playerReducer = (state = INITIAL_STATE, action) => {
  //state = INITIAL_STATE

  switch (action.type) {
    // helps identify when the data is being transmitted by the server
    case actionTypes.REQUEST_DATA: {
      return { ...state, fetchingData: true }
    }

    // the a complete list of players
    case actionTypes.FETCH_PLAYERS: {
      const playerList = Object.values(action.playerList)
      return { playerList, fetchingData: false, activeFilter: action.activeFilter }
    }

    // PLAYER LIST FILTERS
    case actionTypes.FILTER_PLAYERS: {
      action.playerList.map(
        player => {
          (player.status === action.filterType || action.filterType === null)
            ? player.visible = true
            : player.visible = false
        }
      )
      return {
        playerList: action.playerList,
        activeFilter: action.filterType,
        fetchingData: false
      }
    }

    default: {
      return state;
    }
  }
};

export default playerReducer;