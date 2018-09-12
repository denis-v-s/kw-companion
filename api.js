import { mockData } from './mockData'
import { IN_GAME, IN_ROOM, IN_LOBBY, ACTIVE_MATCH, STAGING_ROOM } from './constants'

const url = 'https://info.server.cnc-online.net/'

let result
let playerList = {}
let activeGames = {}
let stagingRooms = {}

const debugMode = false

export const fetchDataAsync = async () => {
  playerList = {}
  activeGames = {}
  stagingRooms = {}

  //console.log('fetching data')
  if (debugMode) {
    result = mockData.cnc3kw
  } else {
    const response = await fetch(url)
    result = (await response.json()).cnc3kw
  }


  Object.keys(result.users).map(parsePlayers)
  result.games.playing.map(parseRooms(ACTIVE_MATCH))
  result.games.staging.map(parseRooms(STAGING_ROOM))

  if (debugMode) {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('success')
      }, 1000)
    })
  }

  return { playerList, activeGames, stagingRooms }
}

const parsePlayers = (user) => {
  const { pid: id, nickname: name } = result.users[user]
  playerList[name] = {
    id,
    name,
    room: '',
    roomPlayerCount: 0,
    status: IN_LOBBY,
    visible: true // used for player list filtering
  }
}

const parseRooms = roomType => (room, i) => {
  const { title, map, pw: password, numObservers: observerCount, numplayers: playerCount, maxRealPlayers: totalSlots, numRealPlayers: claimedSlots } = room
  const players = []
  // decide whether to add the room to a map of active games, or staging rooms
  let temp = (roomType === ACTIVE_MATCH) ? activeGames : stagingRooms

  temp[title] = {
    id: i,
    title,
    map,
    password,
    players,
    totalSlots,
    claimedSlots,
    observerCount,
    playerCount,
    aiCount: claimedSlots - playerCount
  }

  // link players with their respective rooms
  room.players.map(player => {
    playerList[player.nickname].status = (roomType === ACTIVE_MATCH) ? IN_GAME : IN_ROOM
    playerList[player.nickname].room = title
    playerList[player.nickname].roomPlayerCount = playerCount
    players.push(player.nickname)
  })

  temp = null
}