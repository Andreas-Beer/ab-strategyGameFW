export interface EffectHandlerMap {}

export type EffectHandler<T> = (data: T) => void;

export class EffectEventBus {
  private effectsMap: { [key in keyof EffectHandlerMap]?: Function } = {};

  addHandler<
    T extends keyof EffectHandlerMap,
    U extends (obj: EffectHandlerMap[T]) => void,
  >(effectKey: T, handler: U) {
    this.effectsMap[effectKey] = handler;
  }

  activateEvent<
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

export const effectEventBus = new EffectEventBus();
