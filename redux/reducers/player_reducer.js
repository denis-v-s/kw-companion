import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
  fetchingData: false,
  playerList: {},
  filteredPlayerList: {},
  activeFitler: null,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // helps identify when the data is being transmitted by the server
    case actionTypes.REQUESTING_PLAYER_DATA: {
      return { ...state, fetchingData: true }
    }

    // the a complete list of players
    case actionTypes.FETCH_PLAYERS: {
      const playerList = Object.values(action.playerList);
      let filteredPlayerList = filterPlayers(action.activeFilter, playerList);

      return {
        ...state,
        playerList,
        filteredPlayerList,
        fetchingData: false,
        activeFilter: action.activeFilter
      };
    }

    // PLAYER LIST FILTERS
    case actionTypes.FILTER_PLAYERS: {
      let filteredPlayerList = filterPlayers(action.filterType, state.playerList);

      return {
        ...state,
        filteredPlayerList,
        activeFilter: action.filterType,
      }
    }

    default: {
      return state;
    }
  }
};

const filterPlayers = (filterType, playerList) => {
  let filteredPlayerList;
  if (filterType != null) {
    filteredPlayerList = playerList.filter(player => (player.status === filterType));
  } else {
    filteredPlayerList = playerList;
  }

  return filteredPlayerList;
}

export default playerReducer;