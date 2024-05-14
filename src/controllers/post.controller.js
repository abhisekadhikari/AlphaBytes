const { PostModel } = require("../models/enroll.model")
const { Course } = require("../models/course.model")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { imageUploader, imageRemover } = require("../utils/imageHandler")
const mongoose = require("mongoose")
const { StatusCodes } = require("http-status-codes")

const addPost = asyncErrorHandler(async (req, res) => {
    const { name, duration, description, cost } = req.body

    if (!name || !duration || !description || !cost)
        return res.status(400).json({
            message:
                "Please ensure all fields are filled out before submitting the form. Thank you.",
            status: false,
        })

    const imageUrl = []
    const imageId = []

    for (const file of req.files) {
        const image = await imageUploader(file.path, "course-enrollments")
        imageUrl.push(image.secure_url)
        imageId.push(image.public_id)
    }

    await Course.create({
        name,
        duration,
        description,
        cost,
        image: imageUrl,
        imageId: imageId,
    })

    res.redirect("/posts")
})

const renderPost = asyncErrorHandler(async (req, res) => {
    res.render("addpost", {
        data: null,
    })
})

const getPosts = asyncErrorHandler(async (req, res) => {
    const courses = await Course.find()

    if (!courses.length)
        return res.status(404).json({
            message: "No courses found",
            status: false,
        })

    res.status(200).json({
        message: "courses fetched successfully",
        status: true,
        data: courses,
    })
})

const deletePost = asyncErrorHandler(async (req, res) => {
    const { id } = req.query
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:
                "Please provide a valid post ID to proceed with the deletion. Thank you.",
            status: false,
        })
    }

    const result = await PostModel.findByIdAndDelete(id)

    if (result === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message:
                "The post you are attempting to delete does not exist in the records. It may have already been removed or does not match any existing posts. Please verify the post details and try again.",
            status: false,
        })
    }

    await imageRemover(result.imageId)

    res.status(StatusCodes.OK).json({
        message:
            "Post successfully deleted. It has been removed from system. Thank you for managing your posts.",
        status: true,
    })
})

module.exports = {
    addPost,
    renderPost,
    getPosts,
    deletePost,
}
