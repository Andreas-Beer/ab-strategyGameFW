import { ticker, processQueue } from "./Ticker.js";

class Effect {
  constructor(effect) {
    this.effect = effect;
  }
}

function invokeEffect(effect, data, townId, ticker2) {
  console.log("effect.js - invokeEffect() - (before)", processQueue);
  const { type, repeat, resourceId, amount } = effect;
  const town = data.getTownById(townId);

  if (type.indexOf("increase") !== -1 && type.indexOf("resource") !== -1) {
    if (repeat) {
      const onFinish = () => {
        data.increaseValue(townId, "resources", resourceId, amount);
        ticker.setProcess(repeat, {
          onFinish,
          onProcess: (time) => {
            console.log("process", time);
          },
        });
      };
      onFinish();
    } else {
      data.increaseValue(townId, "resources", resourceId, amount);
    }
    console.log("effect.js - invokeEffect() - (after)", processQueue);
  }
}

export { invokeEffect };
