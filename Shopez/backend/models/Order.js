const mongoose = require("mongoose");

module.exports = mongoose.model("Order", new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  status: { type: String, default: "Placed" },
  date: { type: Date, default: Date.now }
}));
