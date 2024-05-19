const router=require('express').Router()
const authc=require('../controllers/authcontroller')
const jwt=require('jsonwebtoken')
require('dotenv').config()


router.post('/signup',authc.signup)
router.post('/login',authc.login)
router.post('/forgot',authc.forgot)
router.get('/profiledata/:dd',authc.profiledata)
router.get('/profilesingledata/:aa',authc.profilesingledata)
router.put('/profile/:id',authc.profile)
router.put('/forgotpassword',authc.forgotpassword)
router.get('/verifytoken/:token',(req,res)=>{
    const token=req.params.token
    if(token){
        jwt.verify(token,process.env.KEY1,(error,value)=>{
            if(!error){
                res.status(200).json({
                    message:"token verify",
                    status:200
                })
            }else{
                res.status(400).json({
                    message:error.message,
                    status:400
                })
            }
        })
    }else{
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
})










module.exports=router