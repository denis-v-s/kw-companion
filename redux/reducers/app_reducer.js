import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
  showPlayerModal: false,
  showPlayerListOptionsBar: false,
  selectedPlayerId: null,
  selectedRoomId: null,
  showViewRoomButton: true
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_PLAYER_LIST_ITEM_MODAL: {
      return {
        ...state,
        showPlayerModal: !state.showPlayerModal,
        selectedPlayerId: action.selectedPlayerId,
        showViewRoomButton: action.showViewRoomButton
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

    case 'SELECT_ROOM': {
      return {
        ...state,
        selectedRoomId: action.roomId
      }
    }

    case 'SELECT_PLAYER': {
      return {
        ...state,
        selectedPlayerId: action.playerId
      }
    }

    default:
      return { ...state };
  }
}

export default appReducer;