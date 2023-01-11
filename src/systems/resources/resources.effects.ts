import { effectEventBus, EffectHandler } from '../../components/EffectEventBus';
import { ResourcesPlayerData } from './resources.interfaces';
import { ResourcesSystem } from './ResourcesSystem';

export function initEffectHandlers(
  resourceSystem: ResourcesSystem,
  resourcesPlayerData: ResourcesPlayerData,
) {
  const modifyResources: EffectHandler<'modify/resources'> = ({
    amount,
    resourceId,
  }) => {
    if (amount === 0) {
      return;
    }

    const currentActiveTownId = resourcesPlayerData.getCurrentActiveTown().id;

    if (amount < 0) {
      resourceSystem.decreaseAmount(resourceId, amount, {
        townId: currentActiveTownId,
      });
    } else {
      resourceSystem.increaseAmount(resourceId, amount, {
        townId: currentActiveTownId,
      });
    }
  };

  const modifyCapacities: EffectHandler<'modify/capacity'> = ({
    amount,
    resourceId,
  }) => {};

  effectEventBus.addHandler('modify/resources', modifyResources);
  effectEventBus.addHandler('modify/capacity', modifyCapacities);
}
