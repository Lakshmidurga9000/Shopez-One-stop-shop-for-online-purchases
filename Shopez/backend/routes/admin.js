const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Admin = require('../models/Admin');

const router = express.Router();

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
};

router.get('/users', isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/products', isAdmin, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/orders', isAdmin, async (req, res) => {
  const orders = await Order.find().populate('userId');
  res.json(orders);
});

router.get('/analytics', isAdmin, async (req, res) => {
  const totalOrders = await Order.countDocuments();
  res.json({ totalOrders });
});

router.post('/categories', isAdmin, async (req, res) => {
  const admin = new Admin(req.body);
  await admin.save();
  res.status(201).json(admin);
});

module.exports = router;