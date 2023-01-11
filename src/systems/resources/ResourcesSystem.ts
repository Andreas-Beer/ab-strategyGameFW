import { TownId } from '../../data/playerData/playerData.types';
import { cloneObj } from '../../helpers/cloneObj';
import { initEffectHandlers } from './resources.effects';
import { ResourcesPlayerData } from './resources.interfaces';
import {
  decreaseResourceAmount,
  decreaseResourceMaxLimit,
  findResource,
  increaseResourceAmount,
  increaseResourceMaxLimit,
} from './resources.module';
import { ResourceData, ResourceId } from './resources.types';

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

export class ResourcesSystem {
  constructor(protected playerData: ResourcesPlayerData) {
    initEffectHandlers(this, playerData);
  }

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
