const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String
})

module.exports = mongoose.model("user", userSchema)