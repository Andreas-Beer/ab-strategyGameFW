import Ticker from "./Ticker.js";

function parseEffect(effect) {
  const [action, category] = effect.type.split("/");
  return { action, category, ...effect };
}

function invokeEffect(effect, data, townId) {
  const town = data.getTownById(townId);
  const parsedEffect = parseEffect(effect);
  const { action, category, repeat, resourceId, amount } = parsedEffect;

  if (action === "increase") {
    if (repeat) {
      const onFinish = () => {
        Ticker.getInstance().setProcess(repeat, {
          onFinish,
        });
        data.increaseValue(townId, category, resourceId, amount);
        console.log("effect invoked repeat", parsedEffect, town);
      };
      onFinish();
    } else {
      data.increaseValue(townId, category, resourceId, amount);
      console.log("effect invoked", parsedEffect, town);
    }
  }
}

export { invokeEffect };
