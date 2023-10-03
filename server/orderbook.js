const { MatchingEngine, OrderSide } = require("exchange-macthing-engine");

const matchingEngine = new MatchingEngine();

/**
 * Place New Order(BUY) (Instrument, Price, Quantity, Side)
 */
const buyOrder = (price, quantity) => {
  return matchingEngine.newOrder("Instrument", price, quantity, OrderSide.buy);
};

/**
 * Place New Order(SELL) (Instrument, Price, Quantity, Side)
 */
const sellOrder = (price, quantity) => {
  return matchingEngine.newOrder("Instrument", price, quantity, OrderSide.sell);
};

module.exports = {
  buyOrder,
  sellOrder,
};
