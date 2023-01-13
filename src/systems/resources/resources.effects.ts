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
    townId,
  }) => {
    if (amount === 0) {
      return;
    }

    townId = townId ?? resourcesPlayerData.getCurrentActiveTown().id;

    if (amount < 0) {
      resourceSystem.decreaseAmount(resourceId, amount, {
        townId,
      });
    } else {
      resourceSystem.increaseAmount(resourceId, amount, {
        townId,
      });
    }
  };

  const modifyCapacities: EffectHandler<'modify/capacity'> = ({
    amount,
    resourceId,
  }) => {};

  effectEventBus.registerEffectHandler('modify/resources', modifyResources);
  effectEventBus.registerEffectHandler('modify/capacity', modifyCapacities);
}
