import { BaseSystem } from '../base';
import { Requirement } from './requirements.types';
import { TownId } from '../../data/playerData/playerData.types';

export class RequirementsSystem extends BaseSystem {
  check(requirements: Requirement[], townId: TownId) {}
}