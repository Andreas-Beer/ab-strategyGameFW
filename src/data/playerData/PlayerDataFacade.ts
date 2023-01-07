import { BuildingsPlayerData } from '../../systems/buildings/buildings.interfaces';
import { RequirementPlayerData } from '../../systems/requirements/requirements.interfaces';
import { ResourcesPlayerData } from '../../systems/resources/resources.interfaces';
import { ResourcesData } from '../../systems/resources/resources.types';
import { TownId, PlayerData, TownData, stackData } from './playerData.types';

class TownNotFoundError extends Error {
  public name = 'TOWN_NOT_FOUND_ERROR';
  public level = 'CRITICAL';

  constructor(townId: TownId) {
    super(`The town with the id: "${townId}" was not found`);
  }
}
export class PlayerDataFacade
  implements RequirementPlayerData, BuildingsPlayerData, ResourcesPlayerData
{
  constructor(private _playerData: PlayerData) {}

  findTownById(townId: TownId): TownData {
    const searchedTown = this._playerData.towns.find(
      (town) => town.id === townId,
    );

    if (!searchedTown) {
      throw new TownNotFoundError(townId);
    }

    return searchedTown;
  }

  getGlobalResources() {
    return this._playerData.resources;
  }

  // I_RequirementSystemData
  getItems(): stackData {
    return this._playerData.items;
  }
  getBuildings(townId: number): BuildingPlayerData[] {
    return this.findTownById(townId).buildings;
  }
  getResources(townId: number): ResourcesData {
    return this.findTownById(townId).resources;
  }
  getPlayerLevel(): number {
    return this._playerData.level;
  }
}
