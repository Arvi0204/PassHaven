const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasswordSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    URL: {
        type: String,
        default: "General"
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model( 'password', PasswordSchema)