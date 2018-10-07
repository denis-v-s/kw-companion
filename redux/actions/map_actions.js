import { mapData } from '../../mapData';

export const getRandomMap = (mapPlayerCount, prevRandomMap, plusVersion) => dispatch => {
  // get a collection of 1v1, 2v2, 3v3, or 4v4 maps based on the map player count
  const maps = Object.values(mapData).filter(map => {
    return (plusVersion)
    ? map.players === mapPlayerCount && map.R13 === true
    : map.players === mapPlayerCount
  });

  const min = 0;
  const max = maps.length - 1;

  // use a loop to prevent duplicate randoms
  let randomMap = null;
  do {
    // min and max are inclusive
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    randomMap = maps[randomIndex];
  } while ( randomMap === prevRandomMap && maps.length > 1)

  dispatch({ type: 'GET_RANDOM_MAP', randomMap });
}