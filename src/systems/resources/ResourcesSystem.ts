import { TownId } from '../../data/playerData/playerData.types';
import {
  CalculatorAmount,
  amountCalculator,
} from '../../helpers/amountCalculator';
import { cloneObj } from '../../helpers/cloneObj';
import { initEffectHandlers } from './resources.effects';
import { ResourcesPlayerData } from './resources.interfaces';
import {
  findResourceById,
  modifyMaxResourceLimit,
  modifyResourceAmount,
} from './resources.module';
import { ResourceData, ResourceId } from './resources.types';

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

  find(resourceId: ResourceId): ResourceData {
    const resourcesData = findResourceById({
      resourcesPlayerData: this.playerData,
      resourceId,
    });

    return Object.freeze(cloneObj(resourcesData));
  }

  increaseMaxLimit(resourceId: ResourceId, amount: CalculatorAmount) {
    const resourcesData = findResourceById({
      resourcesPlayerData: this.playerData,
      resourceId,
    });

    modifyMaxResourceLimit({
      calculator: amountCalculator(amount),
      resourcesData,
      resourceId,
    });
  }

  modifyLimit(
    resourceId: ResourceId,
    amount: CalculatorAmount,
    { type }: { type: 'max' | 'min' } = { type: 'max' },
  ) {}

  modifyAmount(
    resourceId: ResourceId,
    amount: CalculatorAmount,
    { shouldIgnoreLimit }: ChangeResourceAmountOptions = {},
  ) {
    const resourceData = findResourceById({
      resourcesPlayerData: this.playerData,
      resourceId,
    });

    modifyResourceAmount({
      calculator: amountCalculator(amount),
      resourceData,
      options: { shouldIgnoreLimit },
    });
  }
}
