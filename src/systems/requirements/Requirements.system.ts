import { BaseSystem } from '../base';
import { Requirement } from './requirements.types';
import { TownId } from '../../data/playerData/playerData.types';
import { checkRequirementsAgainstPlayerData } from './requirements.module';
import { I_RequirementPlayerData } from './requirements.interfaces';

export class RequirementsSystem {
  constructor(private playerData: I_RequirementPlayerData) {}

  check(requirements: Requirement[], townId: TownId) {
    return checkRequirementsAgainstPlayerData({
      playerData: this.playerData,
      requirements,
      townId,
    });
  }
}
