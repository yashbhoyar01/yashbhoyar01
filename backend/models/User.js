const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String, // Optional if just username login
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true
    },
    careerValues: {
        type: Map,
        of: Number,
        default: {}
    },
    careerField: {
        type: String,
        default: null
    },
    assessment: {
        logic: Number,
        skill: Number,
        consistency: Number,
        totalScore: Number,
        level: String,
        phase: Number,
        completedAt: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
