const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({

    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: Array,
        required: true
    },     
    // mobileNumber: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true 
    // },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

const log_in = new mongoose.model("Login", LoginSchema);

module.exports = log_in;