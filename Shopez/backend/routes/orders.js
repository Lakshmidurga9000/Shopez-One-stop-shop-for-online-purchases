const router = require("express").Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  res.json(await Order.create(req.body));
});

router.get("/", async (_, res) => {
  res.json(await Order.find());
});

module.exports = router;
