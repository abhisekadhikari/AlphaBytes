const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        duration: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        cost: {
            type: Number,
            required: true,
            trim: true,
        },
        image: [],
        imageId: [],
    },
    { timestamps: true }
)

const Course = mongoose.model("course", courseSchema)

module.exports = { Course }
