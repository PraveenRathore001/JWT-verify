const Jwt = require('jsonwebtoken')




const verifytoken=(req,res,next)=>{
    const {authorization} = req.headers;
    const bearerheader = authorization;
    if(typeof bearerheader !== 'undefined'){
        const bearer=bearerheader.split(" ")
        console.log(bearer,"bearer");
        const token=bearer[1];
        console.log(token);
        // req.token=token;
        Jwt.verify(token,process.env.secret,(err)=>{
            if(err){
                res.send({token:"invalid token"})
            }else{
                 
                next()
            }
        })
        
    }else{
        res.json({
            message:'cant get token'
        })
    }
}    



module.exports=verifytoken


