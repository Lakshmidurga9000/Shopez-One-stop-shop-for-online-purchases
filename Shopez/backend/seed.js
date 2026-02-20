const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1/shopez");

(async () => {
  await Product.deleteMany();

  await Product.insertMany([
    { name: "Smart Watch", price: 2999 },
    { name: "Headphones", price: 1999 },
    { name: "Bluetooth Speaker", price: 1499 },
    { name: "Shoes", price: 2499 }
  ]);

  console.log("✅ Products added!");
  process.exit();
})();
