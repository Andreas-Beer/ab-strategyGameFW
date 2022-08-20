import Ticker from "./Ticker.js";

class Effect {
  constructor(effect) {
    this.effect = effect;
  }
}

function invokeEffect(effect, data, townId) {
  const { type, repeat, resourceId, amount } = effect;
  const town = data.getTownById(townId);

  if (type.indexOf("increase") !== -1 && type.indexOf("resource") !== -1) {
    if (repeat) {
      const onFinish = () => {
        console.log("effect finish!");
        data.increaseValue(townId, "resources", resourceId, amount);
        Ticker.getInstance().setProcess(repeat, {
          onFinish,
        });
      };
      onFinish();
    } else {
      data.increaseValue(townId, "resources", resourceId, amount);
    }
  }
}

export { invokeEffect };
