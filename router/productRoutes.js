const express=require('express')
const routerss =express()
const controller = require('../controller/productcontroller')




routerss.post('/addata',controller.addproduct)
routerss.get('/getdata',controller.getpdetails)




module.exports=routerss