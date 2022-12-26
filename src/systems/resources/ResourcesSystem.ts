import { BaseSystem } from '../base';
import { ResourceId } from './resource.types';
import {
  decreaseResourceAmount,
  increaseResourceAmount,
} from './resources.helper';

export class ResourcesSystem extends BaseSystem {
  increase(resourceId: ResourceId, amount: number, max?: number) {
    increaseResourceAmount(
      this.playerData._playerData.resources,
      resourceId,
      amount,
      max,
    );
  }
  decrease(resourceId: ResourceId, amount: number, min?: number) {
    decreaseResourceAmount(
      this.playerData._playerData.resources,
      resourceId,
      amount,
      min,
    );
  }
}
