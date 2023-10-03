"use strict";

const { PeerRPCServer } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const orderbook = require("./orderbook");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport("server");
service.listen(port);

setInterval(function () {
  link.announce("rpc_test", service.port, {});
}, 1000);

service.on("request", (rid, key, payload, handler) => {
  const order = payload.order.data.order;
  let newOrder;
  if (order.side == 0) {
    newOrder = orderbook.buyOrder(order.price, order.qty);
  } else if (order.side == 1) {
    newOrder = orderbook.sellOrder(order.price, order.qty);
  }

  console.log("Order Placed \n", newOrder.data.order);
  if (newOrder.data.trades.length != 0)
    console.log("Order Traded \n", newOrder.data.trades);

  handler.reply(null, {
    order: newOrder.data.order.orderId,
    trade: newOrder.data.trades,
  });
});
