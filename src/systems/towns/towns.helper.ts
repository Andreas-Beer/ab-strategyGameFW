import { TownData, TownId } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';

class TownNotFoundError extends Error {
  public name = 'TOWN_NOT_FOUND_ERROR';
  public category = 'CRITICAL';

  constructor(townId: TownId) {
    super(`The town with the id: "${townId}" was not found`);
  }
}

function getTownById(
  playerDataFacade: PlayerDataFacade,
  townId: TownId,
): TownData {
  const searchedTown = playerDataFacade._playerData.towns.find(
    (town) => town.id === townId,
  );

  if (!searchedTown) {
    throw new TownNotFoundError(townId);
  }

  return searchedTown;
}

export { getTownById };
