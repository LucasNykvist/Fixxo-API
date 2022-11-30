// General Requirements
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const bodyparser = require("body-parser")
const port = process.env.PORT || 5000


// Connect Database
mongoose.connect(process.env.DATABASE_URI, () => {
    console.log("Connected to database...");
})

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())


// Controller Imports & Use
const usersController = require("./controllers/usersController")
app.use("/api/users", usersController)
const productsController = require("./controllers/productsController")
app.use("/api/products", productsController)

// Listen
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})