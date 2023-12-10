const mongoose = require("mongoose");

const logInSchema = new mongoose.Schema({

        // displayName: {
        //     type: String 
        // },
        // emails: {
        //     type: String 
        // }
    
    email: {
        type: String,
        require: true
    },
    // name: {
    //     type: String,
    //     require: true
    // }
    // email: {
    //     type: String,
    //     require: true
    // },
    // password: {
    //     type: String,
    //     require: true
    // }

    // -------

    // sign_name: {
    //     type: String,
    //     require: true
    // },
    // team_village: {
    //     type: String,
    //     require: true
    // },
    // team_id: {
    //     type: String,
    //     require: true
    // },
    // team_pass: {
    //     type: String,
    //     require: true
    // }
});

const register = new mongoose.model("sign_up", logInSchema)

module.exports = register