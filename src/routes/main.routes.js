const mainRoutes = require("express").Router()
const { dashboardRoutes } = require("./dashboard.routes")
const { contactRoutes } = require("./contact.routes")
const { signinRoutes } = require("./signin.routes")
const checkAuth = require("../middleware/checkAuth.middleware")
const isLoggedIn = require("../middleware/isLoggedIn.middleware")
const { postRoute } = require("./post.routes")
const { PostModel } = require("../models/enroll.model")
const { tableRoutes } = require("./table_booking.routes")
const { getBookings } = require("../controllers/table.controller")
const { getPosts } = require("../controllers/post.controller")
const { Course } = require("../models/course.model")

mainRoutes.use("/auth", checkAuth, signinRoutes)

mainRoutes.route("/courses").get(getPosts)

mainRoutes.use("/book-course", tableRoutes)

mainRoutes.use("/contact", contactRoutes)

mainRoutes.use("/", isLoggedIn, dashboardRoutes)

mainRoutes.use("/addpost", postRoute)

mainRoutes.route("/bookings").get(getBookings)

mainRoutes.get("/posts", isLoggedIn, async (req, res) => {
    const course = await Course.find()
    res.render("posts", { data: course })
})

mainRoutes.route("/logout").get((req, res) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect("/")
    })
})

module.exports = { mainRoutes }
