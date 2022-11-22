const express = require("express")
const controller = express.Router()
const { uuid } = require('uuidv4');
let users = require("../data/simulated_database");

controller.param("id", (req, res, next, id) => {
    req.user = users.find((user) => user.id === id)
    next()
})

controller.post("/", (req, res) => {
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    users.push({ ...user, id: uuid() })
    res.status(201).json(user)
})

controller.get("/", (req, res) => {
    res.status(200).json(users)
})


controller.get("/:id", (req, res) => {
    if (req != undefined) {
        res.status(200).send(req.user)
    } else {
        res.status(404).json()
    }
})

controller.put("/:id", (req, res) => {
    if (req != undefined) {
        users.forEach(user => {
            if (user.id === req.user.id) {
                user.firstName = req.body.firstName ? req.body.firstName : user.firstName
                user.lastName = req.body.lastName ? req.body.lastName : user.lastName
                user.email = req.body.email ? req.body.email : user.email
            }
        })
        res.status(200).json(res.user)
    } else {
        res.status(404).json()
    }
})

controller.delete("/:id", (req, res) => {
    if (req != undefined) {
        users = users.filter(user => user.id !== req.user.id)
        res.status(204).json()
    } else {
        res.status(404).json()
    }
})

module.exports = controller