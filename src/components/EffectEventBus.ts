export interface EffectHandlerMap {}

export type EffectHandler<T extends keyof EffectHandlerMap> = (
  data: EffectHandlerMap[T],
) => void;

export class EffectBus {
  private effectsMap: { [key in keyof EffectHandlerMap]?: Function } = {};

  registerEffectHandler<
    T extends keyof EffectHandlerMap,
    U extends EffectHandler<T>,
  >(effectKey: T, handler: U) {
    this.effectsMap[effectKey] = handler;
  }

  triggerEffect<
    T extends keyof EffectHandlerMap,
    U extends EffectHandlerMap[T],
  >(effectKey: T, data: U) {
    const handler = this.effectsMap[effectKey];

    if (!handler) {
      console.warn(
        `[EffectEventBus] activateEvent - No handler found for the key ${effectKey}`,
      );
    }

    if (handler) {
      handler(data);
    }
  }
}

export const effectBus = new EffectBus();
