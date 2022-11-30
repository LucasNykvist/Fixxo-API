const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    imageName: String,
    category: String,
    price: Number,
    name: String,
    description: String
})

module.exports = mongoose.model("product", productSchema)