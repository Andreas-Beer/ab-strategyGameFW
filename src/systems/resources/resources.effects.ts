import {
  effectEventBus,
  EffectHandler,
  EffectHandlerMap,
} from '../../components/EffectEventBus';
import {
  ModifyResourceCapacityPayload,
  ModifyResourcesAmountPayload,
} from './resources.types';

const modifyResources: EffectHandler<ModifyResourcesAmountPayload> = ({
  amount,
  resourceId,
}) => {};

const modifyCapacities: EffectHandler<ModifyResourceCapacityPayload> = ({
  amount,
  resourceId,
}) => {};

effectEventBus.addHandler('modify/resources', modifyResources);
effectEventBus.addHandler('modify/capacity', modifyCapacities);
