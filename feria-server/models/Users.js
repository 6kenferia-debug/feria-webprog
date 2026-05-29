const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    age: { type: String, default: '' },
    gender: { type: String, default: '' },
    contactNumber: { type: String, default: '' },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    type: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'editor' },
    username: { type: String, unique: true, trim: true },
    password: { type: String, required: true },
    address: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);