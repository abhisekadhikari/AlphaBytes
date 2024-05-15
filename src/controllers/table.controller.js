const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { PostModel } = require("../models/enroll.model")
const { StatusCodes } = require("http-status-codes")
const { imageUploader, imageRemover } = require("../utils/imageHandler")
const mongoose = require("mongoose")

const bookTable = asyncErrorHandler(async (req, res) => {
    const {
        name,
        email,
        address,
        phone,
        course,
        aadhaar,
        parent,
        parent_phone,
    } = req.body

    if (
        !name ||
        !email ||
        !address ||
        !phone ||
        !course ||
        !aadhaar ||
        !parent ||
        !parent_phone
    )
        return res.status(400).json({
            message:
                "Please ensure all fields are filled out before submitting the form. Thank you.",
            status: false,
        })

    await PostModel.create({
        name,
        email,
        address,
        phone,
        course,
        aadhaar,
        parent,
        parent_phone,
    })

    res.status(201).json({
        message:
            "Your booking has been successfully submitted. We will get back to you shortly. Thank you for choosing us.",
        status: true,
    })
})

const getBookings = asyncErrorHandler(async (req, res) => {
    const bookings = await PostModel.find()

    res.render("bookings", {
        data: bookings,
    })
})

const deleteBookings = asyncErrorHandler(async (req, res) => {
    const { id } = req.query
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:
                "Please provide a valid ID to proceed with the deletion. Thank you.",
            status: false,
        })
    }

    const result = await PostModel.findByIdAndDelete(id)

    if (result === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message:
                "The post you are attempting to delete does not exist in the records. It may have already been removed or does not match any existing enrollments. Please verify the post details and try again.",
            status: false,
        })
    }

    res.status(StatusCodes.OK).json({
        message:
            "Post successfully deleted. It has been removed from system. Thank you for managing your enrollments.",
        status: true,
    })
})

module.exports = { bookTable, getBookings, deleteBookings }
