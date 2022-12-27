import { TownId } from '../../data/playerData/playerData.types';
import { BaseSystem } from '../base';
import { getTownById } from '../towns/towns.helper';
import { ResourceId } from './resource.types';
import {
  decreaseResourceAmount,
  increaseResourceAmount,
} from './resources.helper';

type increaseResourceAmountOptions = {
  townId?: TownId;
  max?: number;
};

type decreaseResourceAmountOptions = {
  townId?: TownId;
  min?: number;
};

export class ResourcesSystem extends BaseSystem {
  increase(
    resourceId: ResourceId,
    amount: number,
    { townId, max }: increaseResourceAmountOptions = {},
  ) {
    const resourceData =
      typeof townId !== 'undefined'
        ? getTownById(this.playerData, townId).resources
        : this.playerData._playerData.resources;

    increaseResourceAmount({
      resourceData,
      resourceId,
      amount,
      max,
    });
  }
  decrease(
    resourceId: ResourceId,
    amount: number,
    { min, townId }: decreaseResourceAmountOptions = {},
  ) {
    const resourceData =
      typeof townId !== 'undefined'
        ? getTownById(this.playerData, townId).resources
        : this.playerData._playerData.resources;

    decreaseResourceAmount({
      resourceData,
      resourceId,
      amount,
      min,
    });
  }
}
