const mongoose = require('mongoose');



const productSchema= new mongoose.Schema({   
    productname:{
        type:String,
        required:true
    },
    pdetail:{
        type:String,
        required:true
    },
    pcompany:{
        type:String,
        required:true
    },
    pprice:{
        type:Number,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
}

});
module.exports= mongoose.model('product',productSchema)