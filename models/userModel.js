const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

// Schema för users
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Static signup method
userSchema.statics.signup = async function (email, password) {

    // Validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email not vaild")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password Not Strong Enough")
    }

    // Kolla om email är unik
    const exists = await this.findOne({ email })
    if (exists) {
        throw new Error("Email already in use")
    }

    // Generera hashed password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Skapa user med krypterat password
    const user = await this.create({ email, password: hash })
    return user
}

// Static login method
userSchema.statics.login = async function (email, password) {
    // Validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect Password")
    }

    return user
}



module.exports = new mongoose.model("user", userSchema)