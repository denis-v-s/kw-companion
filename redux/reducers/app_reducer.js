import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
  showPlayerModal: false,
  showPlayerListOptionsBar: false,
  selectedPlayerName: null,
  selectedPlayerId: null
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_PLAYER_LIST_ITEM_MODAL: {
      return {
        ...state,
        showPlayerModal: !state.showPlayerModal,
        selectedPlayerId: action.selectedPlayerId,
        selectedPlayerName: action.selectedPlayerName
      };
    }

    case actionTypes.TOGGLE_PLAYER_SCREEN_OPTIONS: {
      return {
        ...state,
        showPlayerListOptionsBar: !state.showPlayerListOptionsBar
      };
    }

    case actionTypes.VIEW_SHATABRICK: {
      return {
        ...state
      }
    }

    default:
      return { ...state };
  }
}

export default appReducer;