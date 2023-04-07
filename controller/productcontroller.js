const Product=require('../model/productSchema')
// const User =require('../model/userSchema')



const addproduct=async(req,res)=>{
    const newprod = new Product(req.body)
    let result=await newprod.save()
    res.send(result)
}


const getpdetails= async(req,res)=>{
    const alldata= await Product.aggregate([
        { $lookup:
           {
             from: 'users',
             localField: 'userId',
             foreignField: '_id',
             as: 'orderdetails'
           }
         }
        ])
    // let resultt= await alldata.save();
    res.send(alldata)
}



module.exports={addproduct,getpdetails}