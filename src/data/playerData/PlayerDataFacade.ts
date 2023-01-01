import { I_RequirementSystemData } from '../../systems/requirements/requirements.interfaces';
import { PlayerData, TownId } from './playerData.types';

class TownNotFoundError extends Error {
  public name = 'TOWN_NOT_FOUND_ERROR';
  public level = 'CRITICAL';

  constructor(townId: TownId) {
    super(`The town with the id: "${townId}" was not found`);
  }
}
export class PlayerDataFacade implements I_RequirementSystemData {
  constructor(private _playerData: PlayerData) {}
  getPlayerLevel(): number {
    throw new Error('Method not implemented.');
  }

  findTownById(townId: TownId) {
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
}
