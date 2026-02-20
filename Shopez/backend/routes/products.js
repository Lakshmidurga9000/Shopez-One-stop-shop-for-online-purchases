const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", async (_, res) => {
  res.json(await Product.find());
});

router.post("/", async (req, res) => {
  res.json(await Product.create(req.body));
});

module.exports = router;
