const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    image: { type: String },
    // Allow either string or array of strings
    content: {
      type: [String],
      default: [],
    },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);

