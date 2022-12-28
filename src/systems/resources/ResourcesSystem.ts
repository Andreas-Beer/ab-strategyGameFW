import { TownId } from '../../data/playerData/playerData.types';
import { BaseSystem } from '../base';
import { ResourceId } from './resource.types';
import {
  decreaseResourceAmount,
  increaseResourceAmount,
} from './resources.helper';

type ChangeResourceAmountOptions = {
  townId?: TownId;
  shouldIgnoreLimit?: boolean;
};

type ChangeLimitAmountOptions = {
  townId?: TownId;
};
export class ResourcesSystem extends BaseSystem {
  increaseAmount(
    resourceId: ResourceId,
    amount: number,
    { townId, shouldIgnoreLimit }: ChangeResourceAmountOptions = {},
  ) {
    const resourceData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    increaseResourceAmount({
      resourcesData: resourceData,
      resourceId,
      amount,
      options: { shouldIgnoreLimit },
    });
  }

  decreaseAmount(
    resourceId: ResourceId,
    amount: number,
    { townId, shouldIgnoreLimit }: ChangeResourceAmountOptions = {},
  ) {
    const resourceData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    decreaseResourceAmount({
      resourcesData: resourceData,
      resourceId,
      amount,
      options: { shouldIgnoreLimit },
    });
  }

  increaseMaxLimit(
    resourceId: ResourceId,
    amount: number,
    { townId }: ChangeLimitAmountOptions,
  ) {}
}
