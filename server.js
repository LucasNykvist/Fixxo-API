// General Server Setup
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const { graphqlHTTP } = require("express-graphql")
const bodyparser = require("body-parser")
const port = process.env.PORT || 5000



// Connect To Database
mongoose.connect(process.env.DATABASE_URI, () => {
    console.log("Connected to database...");
})

// Middleware
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


// Controller Imports & Use
const usersController = require("./controllers/usersController")
app.use("/api/users", usersController)
const productsController = require("./controllers/productsController")
app.use("/api/products", productsController)

// GraphQL UI
app.use("/graphql", graphqlHTTP({
    schema: require("./schemas/graphQL/graphqlSchema"),
    graphiql: true,
}))

// Listen
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})