import { ticker } from "./modules/Ticker.js";

ticker.start();

export default {
  getTicker: () => ticker,
};
