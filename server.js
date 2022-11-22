const express = require("express")
const app = express()
const cors = require("cors")
const bodyparser = require("body-parser")
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())


const usersController = require("./controllers/usersController")
app.use("/api/users", usersController)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})