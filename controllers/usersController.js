const express = require("express")
const controller = express.Router()
const { uuid } = require('uuidv4');
let users = require("../data/simulated_database");

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
    const { id } = req.params

    const { firstName, lastName, email } = req.body

    const foundUser = users.find((user) => user.id === id)

    if (firstName) {
        foundUser.firstName = firstName
    }
    if (lastName) {
        foundUser.lastName = lastName
    }
    if (email) {
        foundUser.email = email
    }

    res.status(200)

})

controller.delete("/:id", (req, res) => {
    const { id } = req.params
    users = users.filter((user) => user.id !== id)
    res.status(202).send(`User with id ${id} was deleted`)
})

module.exports = controller