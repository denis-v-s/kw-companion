import * as actionTypes from './types'
import * as constants from '../../constants'
import { fetchDataAsync } from '../../api'

export const fetchPlayerListAsync = () => async dispatch => {
  dispatch({ type: actionTypes.REQUEST_DATA })
  const data = await fetchDataAsync()
  
  try {
    dispatch({ type: actionTypes.FETCH_PLAYERS, payload: data.playerList })
  } catch (err) {
    dispatch({ type: actionTypes.DATA_REQUEST_ERROR, payload: err.message })
  }
}

export const filterPlayers = (filterType, playerList) => async dispatch => {
  switch (filterType) {
    case constants.IN_LOBBY: {
      return dispatch({ type: actionTypes.SHOW_PLAYERS_IN_LOBBY, payload: playerList})
    }
    case constants.IN_GAME: {
      return dispatch({ type: actionTypes.SHOW_PLAYERS_IN_GAME, payload: playerList })
    }
    case constants.IN_ROOM: {
      return dispatch({ type: actionTypes.SHOW_PLAYERS_IN_ROOM, payload: playerList })
    }
    default: {
      return dispatch({ type: actionTypes.SHOW_ALL_PLAYERS, payload: playerList })
    }
  }
}