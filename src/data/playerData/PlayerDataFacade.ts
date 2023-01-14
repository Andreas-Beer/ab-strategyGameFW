import { BuildingsPlayerData } from '../../systems/buildings/buildings.interfaces';
import { BuildingData } from '../../systems/buildings/buildings.types';
import { RequirementPlayerData } from '../../systems/requirements/requirements.interfaces';
import { ResourcesPlayerData } from '../../systems/resources/resources.interfaces';
import { ResourcesData } from '../../systems/resources/resources.types';
import { PLayerDataBuildingNotFoundError } from './playerData.errors';
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
  findTownByBuildingId(buildingId: number): TownData {
    const searchedTownIndex = this._playerData.towns
      .map((townData) => townData.buildings.map((building) => building.id))
      .findIndex((buildingIds) => buildingIds.includes(buildingId));
    const searchedTown = this._playerData.towns[searchedTownIndex];

    return searchedTown;
  }
  findBuildingById(buildingId: number): BuildingData {
    const searchedBuilding = this._playerData.towns
      .map((townData) => townData.buildings)
      .flat()
      .find((buildingData) => buildingData.id === buildingId);

    if (!searchedBuilding) {
      throw new PLayerDataBuildingNotFoundError(buildingId);
    }

    return searchedBuilding;
  }

  findTownById(townId: TownId): TownData {
    const searchedTown = this._playerData.towns.find(
      (town) => town.id === townId,
    );

    if (!searchedTown) {
      throw new TownNotFoundError(townId);
    }

    return searchedTown;
  }
  getCurrentActiveTown(): TownData {
    const currentActiveTownId = this._playerData.currentActiveTownId;
    if (!currentActiveTownId) {
      throw new Error(`No current active town was found!`);
    }
    return this.findTownById(currentActiveTownId);
  }

  getGlobalResources(): ResourcesData {
    return this._playerData.resources;
  }

  // I_RequirementSystemData
  getItems(): stackData {
    return this._playerData.items;
  }

  getBuildings(townData: TownData): BuildingData[] {
    return townData.buildings;
  }

  getResources(townData: TownData): ResourcesData {
    return townData.resources;
  }

  getPlayerLevel(): number {
    return this._playerData.level;
  }
}
