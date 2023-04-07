const express=require('express')
require('dotenv').config()
require('./model/config')
const app = express()
const urouter = require("./router/userRoutes")
const prouter = require("./router/productRoutes")

// const bodyParser = require("body-parser")

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/',urouter)
app.use('/',prouter)


// app.post('/',()=>{
//     console.log("bjddbg");
// })
app.listen(process.env.port,()=>{
    console.log(`listening on port ${process.env.port}`)
})