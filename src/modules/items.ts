import { findBy, maybeError } from "../helper/functions";

class Err {
  _error: Error;
  constructor(error: Error) {
    this._error = error;
  }

  get error() {
    return this._error;
  }

  map(fn: Function) {
    return new Err(this._error);
  }
}

class Value {
  _value: any;
  constructor(value: any) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  map(fn: Function) {
    const result = fn(this._value);

    if (result instanceof Error) {
      return new Err(result);
    }
    return new Value(result);
  }
}

function getItemDefinition(
  itemConfigs: ItemConfig[],
  itemId: number
): ValidationResult {
  const result = new Value(itemConfigs)
    .map(findBy("id")(itemId))
    .map(maybeError(`Item with ID "${itemId}" not found`));

  return result;
}

function checkLiquidity(
  resources: ResourceData,
  prices: Price[]
): ValidationResult {
  for (const { resourceId, amount } of prices) {
    const resourceStock = resources[resourceId];
    if (resourceStock == undefined) {
      return {
        error: new Error(`the resource ${resourceId} does not exist`),
      };
    }

    if (resourceStock < amount) {
      return {
        error: new Error(
          `there is not enough amount of resource ${resourceId}. stock is ${resourceStock} but ${amount} are needed`
        ),
      };
    }
  }

  return { value: true };
}

function transaction(
  data: PlayerData,
  { price, id }: { price: Price[]; id: number }
) {
  for (const { resourceId, amount } of price) {
    data.resources[resourceId] -= amount;
  }

  if (!data.items[id]) {
    data.items[id] = 1;
  } else {
    data.items[id] += 1;
  }
}

export { getItemDefinition, checkLiquidity, transaction };
