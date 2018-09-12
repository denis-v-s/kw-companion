import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
  fetchingData: false,
  playerList: {},
  activeGames: {},
  stagingRooms: {},
  playerListFilterType: null,
  showPlayerScreenOptionsBar: false
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
      const playerList = Object.values(action.payload)

      return { playerList, fetchingData: false }
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
        playerListFilterType: action.filterType,
        fetchingData: false
      }
    }

    case actionTypes.TOGGLE_PLAYER_SCREEN_OPTIONS: {
      return {
        showPlayerScreenOptionsBar: true
      }
    }

    default: {
      return state;
    }
  }
};

export default playerReducer;