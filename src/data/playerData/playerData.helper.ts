import { PlayerId, PlayerData } from './playerData.types';

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

const _internal = {
  fetchPlayerData,
};

export { _internal, getPlayerData };
