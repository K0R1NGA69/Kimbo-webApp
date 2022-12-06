require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
const routes = require("./routes")
const path = require("path")
const helmet = require("helmet")
const flash = require("connect-flash")
const { middleWare } = require("./src/middlewares/middleware")
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected")
        app.emit("Done")
    })
    .catch((err) => { console.error(err) })

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
)
const sessionOptions = session({
    secret: "oppaidaisuki",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 24 * 7,
        httpOnly: true
    }

})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "public")))

app.use(sessionOptions)
app.use(flash())
app.use(middleWare)

app.set("views", path.resolve(__dirname, "src", "views"))
app.set("view engine", "ejs")
app.use(routes)

const PORT = process.env.PORT || 3000

app.on("Done", () => {
    app.listen(PORT, () => {
        console.log("Acess http://localhost:3000")
        console.log("Server Running on port 3000")
    })
})
