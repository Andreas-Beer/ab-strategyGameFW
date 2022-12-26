import { ResourceId } from '../../types/resources.types';
import { BaseSystem } from '../base';

export class ResourcesSystem extends BaseSystem {
  increase(resourceId: ResourceId, amount: number) {}
  decrease(resourceId: ResourceId, amount: number) {}
}
