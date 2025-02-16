const mongoose = require("mongoose");

const exymadeSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please add the contact name"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Please add the contact email address"],
            maxlength: [100, "Email cannot exceed 100 characters"],
        },
        phone: {
            type: String,
            required: [true, "Please add the contact phone number"],
        },
        service: {
            type: String,
            required: [true, "Please add the contact service"],
        },
        service_fet: {
            type: String,
            required: [true, "Please add the contact service feature"],
        },
        sel_details: {
            type: String,
            required: [true, "Please add the contact select details"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Ezymade", exymadeSchema);
