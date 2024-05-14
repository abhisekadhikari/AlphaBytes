const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        image: [],
        imageId: [],
    },
    { timestamps: true }
)

const PostModel = mongoose.model("blog", postSchema)

module.exports = { PostModel }
