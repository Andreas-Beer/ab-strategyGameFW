import {
  effectEventBus,
  EffectHandlerKey,
} from '../../components/EffectEventBus';

import { ResourcesSystem } from './ResourcesSystem';

export function initEvents(resourceSystem: ResourcesSystem) {
  const modifyResources: EffectHandlerKey<'modify/resources'> = ({
    amount,
    resourceId,
  }) => {
    if (amount === 0) {
      return;
    }

    if (amount < 0) {
      resourceSystem.decreaseAmount(resourceId, amount);
    } else {
      resourceSystem.increaseAmount(resourceId, amount);
    }
  };

  const modifyCapacities: EffectHandlerKey<'modify/capacity'> = ({
    amount,
    resourceId,
  }) => {};

  effectEventBus.addHandler('modify/resources', modifyResources);
  effectEventBus.addHandler('modify/capacity', modifyCapacities);
}
