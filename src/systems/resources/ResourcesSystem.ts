import { TownId } from '../../data/playerData/playerData.types';
import { cloneObj } from '../../helpers/cloneObj';
import { BaseSystem } from '../base';
import { ResourceData, ResourceId } from './resources.types';
import {
  decreaseResourceAmount,
  decreaseResourceMaxLimit,
  findResource,
  increaseResourceAmount,
  increaseResourceMaxLimit,
} from './resources.module';
import { Prices } from '../../types/price.types';

type FindResourceOptions = {
  townId?: TownId;
};

type ChangeResourceAmountOptions = {
  townId?: TownId;
  shouldIgnoreLimit?: boolean;
};

type ChangeLimitAmountOptions = {
  townId?: TownId;
};

type CheckPriceOptions = {
  townId?: TownId;
};
export class ResourcesSystem extends BaseSystem {
  find(
    resourceId: ResourceId,
    { townId }: FindResourceOptions = {},
  ): ResourceData {
    const resourcesData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    const res = findResource({
      resourcesData,
      resourceId,
    });

    return Object.freeze(cloneObj(res));
  }

  increaseAmount(
    resourceId: ResourceId,
    amount: number,
    { townId, shouldIgnoreLimit }: ChangeResourceAmountOptions = {},
  ) {
    const resourcesData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    increaseResourceAmount({
      resourcesData,
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
    const resourcesData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    decreaseResourceAmount({
      resourcesData,
      resourceId,
      amount,
      options: { shouldIgnoreLimit },
    });
  }

  increaseMaxLimit(
    resourceId: ResourceId,
    amount: number,
    { townId }: ChangeLimitAmountOptions = {},
  ) {
    const resourcesData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    increaseResourceMaxLimit({
      resourcesData,
      resourceId,
      amount,
    });
  }

  decreaseMaxLimit(
    resourceId: ResourceId,
    amount: number,
    { townId }: ChangeLimitAmountOptions = {},
  ) {
    const resourcesData =
      typeof townId !== 'undefined'
        ? this.playerData.findTownById(townId).resources
        : this.playerData.getGlobalResources();

    decreaseResourceMaxLimit({
      resourcesData,
      resourceId,
      amount,
    });
  }
}
