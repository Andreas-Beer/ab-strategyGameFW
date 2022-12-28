import { TownId } from '../../data/playerData/playerData.types';
import { BaseSystem } from '../base';
import { ResourceId } from './resource.types';
import {
  decreaseResourceAmount,
  increaseResourceAmount,
} from './resources.helper';

type ChangeResourceAmountOptions = {
  townId?: TownId;
  useLimit?: boolean;
};
export class ResourcesSystem extends BaseSystem {
  increase(
    resourceId: ResourceId,
    amount: number,
    { townId, useLimit }: ChangeResourceAmountOptions = {},
  ) {
    const resourceData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    const max =
      (useLimit &&
        townId &&
        this.playerData.findTownById(townId).resources[resourceId].max) ||
      undefined;

    increaseResourceAmount({
      resourcesData: resourceData,
      resourceId,
      amount,
      max,
    });
  }
  decrease(
    resourceId: ResourceId,
    amount: number,
    { townId, useLimit }: ChangeResourceAmountOptions = {},
  ) {
    const resourceData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    decreaseResourceAmount({
      resourcesData: resourceData,
      resourceId,
      amount,
      min: 0,
    });
  }
}
