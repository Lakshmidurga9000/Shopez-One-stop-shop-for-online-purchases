const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  categories: [{ type: String }],
  bannerImage: { type: String },
});

module.exports = mongoose.model('Admin', adminSchema);