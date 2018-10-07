import { mapData } from './mapData';

export const getMapThumbnail = (mapTitle) => {
  let cleanName = cleanMapName(mapTitle);
  const missingThumbnail = 'https://i.imgur.com/9V6gSn4.png';
  return (mapData[cleanName] != undefined) ? mapData[cleanName].thumbnail : missingThumbnail;
}

export const getMapSpikeCount = (mapTitle) => {
  let cleanName = cleanMapName(mapTitle);
  return (mapData[cleanName] != undefined) ? mapData[cleanName].spikes : null;
}

export const getMapPlayerCount = (mapTitle) => {
  let cleanName = cleanMapName(mapTitle);
  return (mapData[cleanName] != undefined) ? mapData[cleanName].players : null;
}

const cleanMapName = (mapTitle) => {
  // remove any trace of 1.02+ from the map's name
  let cleanName = mapTitle.replace(/1.02\+\s+(.)*/, '');

  // remove ' from the map's name
  cleanName = cleanName.replace('\'', '');

  // remove NoPoker
  cleanName = cleanName.replace('/Nopoker\s+(.)*/', '');
  cleanName = cleanName.trim().toLowerCase();

  return cleanName;
}