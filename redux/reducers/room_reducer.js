import { FETCH_ROOMS, REQUEST_DATA } from '../actions/types'

const INITIAL_STATE = {
  fetchingData: false,
  playerList: {},
  activeGames: {},
  stagingRooms: {}
};

const roomReducer = (state = INITIAL_STATE, action) => {
  //state = INITIAL_STATE

  switch(action.type) {
    case REQUEST_DATA: {
      return {...state, fetchingData: true}
    }
    case FETCH_ROOMS: {
      //console.log('sending false')
      //return {...state, roomList: action.payload, fetchingData: false}
      return {roomList: action.payload, fetchingData: false}
    }

    default: {
      return state
    }
  }

}

export default roomReducer