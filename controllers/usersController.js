const express = require("express")
const mongoose = require("mongoose")
const controller = express.Router()
const User = require("../models/userModel")

// Find User Middleware Function
const getUser = async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404)
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.user = user
    next()
}

// Create User
controller.post("/", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const newUser = await user.save()
        res.json(newUser).status(201)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Read All Users
controller.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users).status(200)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Read Specific User
controller.get("/:id", getUser, (req, res) => {
    res.json(res.user)
})

controller.put("/:id", getUser, async (req, res) => {
    if (req.body.firstName != null) {
        res.user.firstName = req.body.firstName
    }
    if (req.body.lastName != null) {
        res.user.lastName = req.body.lastName
    }
    if (req.body.age != null) {
        res.user.age = req.body.age
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }

    try {
        const updatedUser = await res.user.save()
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

controller.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "User Removed" }).status(200)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = controller