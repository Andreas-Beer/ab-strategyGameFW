import { PlayerData, PlayerId } from '../../types/data.types';
import { playerDataMock } from './playerData.mock';
import { PlayerDataFacade } from './PlayerDataFacade';

function fetchPlayerData(playerId: PlayerId): Promise<PlayerData> {
  // TODO: Implement Database / API call
  return Promise.resolve(playerDataMock);
}

async function getPlayerData(playerId: PlayerId): Promise<PlayerDataFacade> {
  const data = await fetchPlayerData(playerId);
  return new PlayerDataFacade(data);
}

const _test = {
  fetchPlayerData,
};

export { _test, getPlayerData };
