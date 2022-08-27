import Logger from "./Logger.js";
import Ticker from "./Ticker.js";

const logger = new Logger();

function parseEffect(effect) {
  const [action, category] = effect.type.split("/");
  return { action, category, ...effect };
}

function invokeEffect(effect, data, townId) {
  const town = data.getTownById(townId);
  const parsedEffect = parseEffect(effect);
  const { action, category, repeat, resourceId, amount } = parsedEffect;

  if (action === "modify") {
    if (repeat) {
      const onFinish = () => {
        Ticker.getInstance().setProcess(repeat, {
          onFinish,
        });
        data.modifyValue(townId, category, resourceId, amount);
        logger.log("effect invoked repeat");
      };
      onFinish();
    } else {
      data.modifyValue(townId, category, resourceId, amount);
      logger.log("effect invoked");
    }
  }
}

export { invokeEffect };
