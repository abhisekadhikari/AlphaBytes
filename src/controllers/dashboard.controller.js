const asyncErrorHandler = require("../utils/asyncErrorHandler")
const contactModel = require("../models/contact.model")
const { TableBookingModel } = require("../models/table_booking.model")
const { PostModel } = require("../models/enroll.model")
const { Course } = require("../models/course.model")

const dashboardController = asyncErrorHandler(async (req, res) => {
    const contact = await contactModel.aggregate([
        {
            $count: "contacts",
        },
    ])

    const bookings = await PostModel.aggregate([
        {
            $count: "bookings",
        },
    ])

    const posts = await Course.aggregate([
        {
            $count: "posts",
        },
    ])

    res.render("index", {
        contact: contact[0]?.contacts == null ? 0 : contact[0]?.contacts,
        bookings: bookings[0]?.bookings == null ? 0 : bookings[0]?.bookings,
        posts: posts[0]?.posts == null ? 0 : posts[0]?.posts,
    })
})

module.exports = { dashboardController }
