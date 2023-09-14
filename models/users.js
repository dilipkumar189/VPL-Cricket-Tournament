const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    tname: {
        type: String,
        required: true,
    },
    sp_1: {
        type: String,
        required: true,
    },
    sp_2: {
        type: String,
        required: true,
    },
    village: {
        type: String,
        required: true,
    },
    captain: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    p1_1: {
        type: String,
        required: true,
    },
    p1_2: {
        type: String,
        required: true,
    },
    p1_3: {
        type: String,
        required: true,
    },
    p1_4: {
        type: String,
        required: true,
    },
    // p1_5: {
    //     type: String,
    //     required: true,
    // },
    p2_1: {
        type: String,
        required: true,
    },
    p2_2: {
        type: String,
        required: true,
    },
    p2_3: {
        type: String,
        required: true,
    },
    p2_4: {
        type: String,
        required: true,
    },
    // p2_5: {
    //     type: String,
    //     required: true,
    // },
    p3_1: {
        type: String,
        required: true,
    },
    p3_2: {
        type: String,
        required: true,
    },
    p3_3: {
        type: String,
        required: true,
    },
    p3_4: {
        type: String,
        required: true,
    },
    // p3_5: {
    //     type: String,
    //     required: true,
    // },
    p4_1: {
        type: String,
        required: true,
    },
    p4_2: {
        type: String,
        required: true,
    },
    p4_3: {
        type: String,
        required: true,
    },
    p4_4: {
        type: String,
        required: true,
    },
    // p4_5: {
    //     type: String,
    //     required: true,
    // },
    p5_1: {
        type: String,
        required: true,
    },
    p5_2: {
        type: String,
        required: true,
    },
    p5_3: {
        type: String,
        required: true,
    },
    p5_4: {
        type: String,
        required: true,
    },
    // p5_5: {
    //     type: String,
    //     required: true,
    // },
    p6_1: {
        type: String,
        required: true,
    },
    p6_2: {
        type: String,
        required: true,
    },
    p6_3: {
        type: String,
        required: true,
    },
    p6_4: {
        type: String,
        required: true,
    },
    // p6_5: {
    //     type: String,
    //     required: true,
    // },
    p7_1: {
        type: String,
        required: true,
    },
    p7_2: {
        type: String,
        required: true,
    },
    p7_3: {
        type: String,
        required: true,
    },
    p7_4: {
        type: String,
        required: true,
    },
    // p7_5: {
    //     type: String,
    //     required: true,
    // },
    p8_1: {
        type: String,
        required: true,
    },
    p8_2: {
        type: String,
        required: true,
    },
    p8_3: {
        type: String,
        required: true,
    },
    p8_4: {
        type: String,
        required: true,
    },
    // p8_5: {
    //     type: String,
    //     required: true,
    // },
    p9_1: {
        type: String,
        required: true,
    },
    p9_2: {
        type: String,
        required: true,
    },
    p9_3: {
        type: String,
        required: true,
    },
    p9_4: {
        type: String,
        required: true,
    },
    // p9_5: {
    //     type: String,
    //     required: true,
    // },
    p10_1: {
        type: String,
        required: true,
    },
    p10_2: {
        type: String,
        required: true,
    },
    p10_3: {
        type: String,
        required: true,
    },
    p10_4: {
        type: String,
        required: true,
    },
    // p10_5: {
    //     type: String,
    //     required: true,
    // },
    p11_1: {
        type: String,
        required: true,
    },
    p11_2: {
        type: String,
        required: true,
    },
    p11_3: {
        type: String,
        required: true,
    },
    p11_4: {
        type: String,
        required: true,
    },
    // p11_5: {
    //     type: String,
    //     required: true,
    // },
    p12_1: {
        type: String,
        required: true,
    },
    p12_2: {
        type: String,
        required: true,
    },
    p12_3: {
        type: String,
        required: true,
    },
    p12_4: {
        type: String,
        required: true,
    },
    // p12_5: {
    //     type: String,
    //     required: true,
    // },
    p13_1: {
        type: String,
        required: true,
    },
    p13_2: {
        type: String,
        required: true,
    },
    p13_3: {
        type: String,
        required: true,
    },
    p13_4: {
        type: String,
        required: true,
    },
    // p13_5: {
    //     type: String,
    //     required: true,
    // },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);