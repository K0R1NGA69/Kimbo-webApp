const express = require("express")
const route = express.Router()
const home_controller = require("./src/controllers/home_controller")
const learn_controller = require("./src/controllers/learn_controller")


//Routes for home
route.get("/",home_controller.index)
route.post("/search/:data",home_controller.search)

//Routes for learn
route.get("/learn",learn_controller.index)
//Routes for Ads
route.get("/ads.txt",home_controller.ads)

module.exports = route