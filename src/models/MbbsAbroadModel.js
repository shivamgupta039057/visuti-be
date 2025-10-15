const mongoose = require('mongoose');
const MbbsAbroadSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        trim: true,
    }, 
    image: {
        type: String,
        trim: true,
        required: false,
    },
    university: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('MbbsAbroad', MbbsAbroadSchema);