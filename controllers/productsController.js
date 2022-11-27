const express = require("express")
const controller = express.Router()
const { uuid } = require('uuidv4');
let products = require("../data/simulated_database")

controller.post("/", (req, res) => {
    let product = {
        imageName: req.body.imageName,
        category: req.body.category,
        price: req.body.price,
        name: req.body.name,
        description: req.body.description
    }
    users.push({ ...product, id: uuid() })
    res.status(201).json(product)
})

controller.get("/", (req, res) => {
    res.status(200).json(products)
})

controller.get("/:articleNumber", (req, res) => {
    if (req != undefined) {
        res.status(200).send(req.user)
    } else {
        res.status(404).json()
    }
})

controller.put("/:articleNumber", (req, res) => {
    const { articleNumber } = req.params

    const { imageName, category, price, name, description } = req.body

    const foundProduct = products.find((product) => product.articleNumber === articleNumber)

    if (imageName) {
        foundProduct.imageName = imageName
    }
    if (category) {
        foundProduct.category = category
    }
    if (price) {
        foundProduct.price = price
    }
    if (name) {
        foundProduct.name = name
    }
    if (description) {
        foundProduct.description = description
    }
    res.status(200)
})

controller.delete("/:articleNumber", (req, res) => {
    const { articleNumber } = req.params
    products = products.filter((product) => product.articleNumber !== articleNumber)
    res.status(202).send(`Product with article number ${articleNumber} was deleted`)
})

module.exports = controller