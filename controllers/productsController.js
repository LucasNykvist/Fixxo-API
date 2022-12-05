const express = require("express")
const mongoose = require("mongoose")
const controller = express.Router()
const Product = require("../models/productModel")

// Middleware
// Find Product Middleware Function
const getProduct = async (req, res, next) => {
    let product;
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404)
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.product = product
    next()
}

// Routes
// Read All
controller.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        res.send(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Read Specific
controller.get("/:id", getProduct, (req, res) => {
    res.json(res.product)
})

// Get All By Tag
controller.get("/tag/:tag", async (req, res) => {
    try {
        const taggedProduct = await Product.find({ tag: req.params.tag })
        res.json(taggedProduct).status(200)
    } catch (error) {
        res.json(404).message({ message: error.message })
    }
})

// Create
controller.post("/", async (req, res) => {
    const product = new Product({
        category: req.body.category,
        description: req.body.description,
        imageName: req.body.imageName,
        name: req.body.name,
        price: req.body.price,
        tag: req.body.tag
    })

    try {
        const newProduct = await product.save()
        res.json(newProduct).status(201)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update
controller.put("/:id", getProduct, async (req, res) => {
    if (req.body.category != null) {
        res.product.category = req.body.category
    }
    if (req.body.description != null) {
        res.product.description = req.body.description
    }
    if (req.body.imageName != null) {
        res.product.imageName = req.body.imageName
    }
    if (req.body.name != null) {
        res.product.name = req.body.name
    }
    if (req.body.price != null) {
        res.product.price = req.body.price
    }
    if (req.body.tag != null) {
        res.product.tag = req.body.tag
    }


    try {
        const updatedProduct = await res.product.save()
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete
controller.delete("/:id", getProduct, async (req, res) => {
    try {
        await res.product.remove()
        res.json({ message: "Product Removed" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = controller