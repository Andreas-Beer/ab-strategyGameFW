import { Requirement } from './requirements.types';
import { checkRequirementsAgainstPlayerData } from './requirements.module';
import { RequirementPlayerData } from './requirements.interfaces';

export class RequirementsSystem {
  constructor(private playerData: RequirementPlayerData) {}

  check(requirements: Requirement[]) {
    return checkRequirementsAgainstPlayerData({
      playerData: this.playerData,
      requirements,
    });
  }
}
