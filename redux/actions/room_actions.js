import { FETCH_ROOMS, DATA_REQUEST_ERROR, REQUEST_DATA } from './types'
import { fetchDataAsync } from '../../api'
import { ACTIVE_MATCH } from '../../constants'

export const fetchRoomsAsync = (roomType) => async dispatch => {
  dispatch({ type: REQUEST_DATA })
  const data = await fetchDataAsync()
  
  try {
    const roomData = (roomType === ACTIVE_MATCH) ? data.activeGames : data.stagingRooms
    dispatch({ type: FETCH_ROOMS, payload: roomData })
  } catch (err) {
    dispatch({ type: DATA_REQUEST_ERROR, payload: err.message })
  }
}