import { findBy, log } from "../helper/functions";
import { Maybe, Right, maybeError, identity } from "../helper/functors";

function getItemDefinition(itemConfigs: ItemConfig[], itemId: number) {
  console.log({ itemConfigs, itemId });

  const result = Right(itemConfigs)
    .map(findBy("id")(itemId))
    .chain(maybeError(`Item with ID "${itemId}" not found`))
    .chain(identity);

  console.log("result", result);

  return result;
}

function checkLiquidity(resources: ResourceData, prices: Price[]) {
  return null;
  // const x = prices.map((price) =>
  //   Maybe(price).fold((price) =>
  //     Maybe(resources[price.resourceId])
  //       .map((resourceStock) => resourceStock >= price.amount)
  //       .map(
  //         maybeError(
  //           new Error(
  //             `there is not enough amount of resource ${price.resourceId}. stock is 'resourceStock' but ${price.amount} are needed`
  //           )
  //         )
  //       )
  //   )
  // );

  // console.log("x", x);

  // for (const { resourceId, amount } of prices) {
  //   const resourceStock = resources[resourceId];

  //   const result = Maybe(resourceStock)
  //     .map(maybeError(new Error(`the resource ${resourceId} does not exist`)))
  //     .map((resourceStock: number) => resourceStock > amount)
  //     .map(
  //       maybeError(
  //         new Error(
  //           `there is not enough amount of resource ${resourceId}. stock is ${resourceStock} but ${amount} are needed`
  //         )
  //       )
  //     );

  //   if ("error" in result) {
  //     return result;
  //   }
  // }

  // return { value: true };
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
