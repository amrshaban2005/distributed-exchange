"use strict";
const express = require("express");
const { PeerRPCClient } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const orderbook = require("./orderbook");

const app = express();

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

// buy
app.post("/buy/:price/:qnt", async (req, res, next) => {
  const order = orderbook.buyOrder(req.params.price, req.params.qnt);
  console.log("order Id ", order.data.order.orderId);
  const data = await makePeerRequest(order);
  console.log(data);
});

// sell
app.post("/sell/:price/:qnt", async (req, res, next) => {
  const order = orderbook.sellOrder(req.params.price, req.params.qnt);
  console.log(order.data.order.orderId);
  try {
    const data = await makePeerRequest(order);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

const makePeerRequest = async (order) => {
  return new Promise((resolve, reject) => {
    peer.request(
      "rpc_test",
      { order: order },
      { timeout: 10000 },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
