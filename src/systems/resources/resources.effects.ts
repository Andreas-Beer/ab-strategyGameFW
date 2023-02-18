import { effectBus, EffectHandler } from '../../components/EffectEventBus';
import { ResourcesPlayerData } from './resources.interfaces';
import { ResourcesSystem } from './ResourcesSystem';

export function initEffectHandlers(
  resourceSystem: ResourcesSystem,
  resourcesPlayerData: ResourcesPlayerData,
) {
  const modifyResources: EffectHandler<'modify/resources'> = ({
    amount,
    resourceTypeId,
  }) => {
    resourceSystem.modifyAmount(resourceTypeId, amount, {});
  };

  const modifyCapacities: EffectHandler<'modify/capacity'> = ({
    amount,
    resourceTypeId,
  }) => {
    resourceSystem.modifyLimit(resourceTypeId, amount);
  };

  effectBus.registerEffectHandler('modify/resources', modifyResources);
  effectBus.registerEffectHandler('modify/capacity', modifyCapacities);
}
