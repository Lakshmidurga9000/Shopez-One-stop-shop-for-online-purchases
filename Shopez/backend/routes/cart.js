const router = require("express").Router();

let cart = [];

router.get("/", (_, res) => {
  res.json(cart);
});

router.post("/", (req, res) => {
  cart.push(req.body);
  res.json(cart);
});

router.delete("/", (_, res) => {
  cart = [];
  res.json(cart);
});

module.exports = router;
