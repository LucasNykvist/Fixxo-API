const express = require("express")
const mongoose = require("mongoose")
const controller = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// Funktion som skapar token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

// Login Route
controller.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // Skapa en token
        const token = createToken(user._id)

        res.json({ email, token }).status(200)
    } catch (Error) {
        res.status(400).json({ message: Error.message })
    }
})

// Signup Route
controller.post("/signup", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // Skapa en token
        const token = createToken(user._id)

        res.json({ email, token }).status(200)
    } catch (Error) {
        res.status(400).json({ message: Error.message })
    }
})

module.exports = controller