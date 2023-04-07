const express=require('express')
const routers =express()
const a = require('../controller/userController')
const val=require('../validation/validation')
const auth = require("../controller/middleware")



routers.post('/signup',val.dataToValidate,a.signUp)
routers.post('/login',val.loginval,a.logIn)
routers.patch('/Update/:id',auth,a.update)
// routers.get('/get',a.cc)






module.exports=routers 