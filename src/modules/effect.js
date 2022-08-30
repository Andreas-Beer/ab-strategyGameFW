import Logger from "./Logger.js";
import Ticker from "./Ticker.js";

const logger = new Logger();

function parseEffect(effect) {
  const [action, category, resourceId] = effect.type.split("/");
  return { action, category, resourceId, ...effect };
}

function invokeEffect(effect, data, townId, userId) {
  const town = data.getTownById(townId);
  const parsedEffect = parseEffect(effect);
  const { action, category, repeat, resourceId, amount } = parsedEffect;

  if (action === "modify") {
    if (repeat) {
      const onFinish = () => {
        Ticker.getInstance().setProcess(repeat, {
          userId,
          onFinish,
        });
        data.modifyValue(townId, category, resourceId, amount);
        logger.log("effect invoked repeat", {
          action,
          category,
          amount,
          resourceId,
        });
      };
      onFinish();
    } else {
      data.modifyValue(townId, category, resourceId, amount);
      logger.log("effect invoked", { action, category, amount, resourceId });
    }
  }
}

export { invokeEffect };
