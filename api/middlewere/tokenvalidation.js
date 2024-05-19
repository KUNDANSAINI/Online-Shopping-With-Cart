const jwt=require('jsonwebtoken')
require('dotenv').config()
function tokenvalidation(req,res,next){
    let authentication=req.headers['authentication']
    if(authentication){
        const token=authentication.split(" ")[1]
        if(token){
            jwt.verify(token,process.env.KEY,(error,value)=>{
                if(!error){
                    next()
                }else{
                    res.status(400).json({
                        message:error.message,
                        status:400
                    })
                }
            })
        }else{
            res.status(400).json({
                message:"Invalid Token",
                status:400
            })
        }
    }else{
        res.status(400).json({
            message:"You Are Not Authenticated To Use This Data",
            status:400
        })
    }
}




module.exports=tokenvalidation