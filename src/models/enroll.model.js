const mongoose = require("mongoose")

const enrollSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        course: {
            type: String,
            required: true,
            trim: true,
        },
        aadhaar: {
            type: String,
            required: true,
            trim: true,
        },
        parent: {
            type: String,
            required: true,
            trim: true,
        },
        parent_phone: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
)

const PostModel = mongoose.model("enroll", enrollSchema)

module.exports = { PostModel }
