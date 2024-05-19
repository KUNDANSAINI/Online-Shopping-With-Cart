const authTable=require('../models/auth')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const nodemailer=require('nodemailer')
require('dotenv').config()



exports.signup=async(req,res)=>{
    try{
        var {fname,lname,email,password,dob,mob}=req.body
        const emailcheck=await authTable.findOne({email:email})
        //console.log(emailcheck)
        if(!fname){
            throw new Error('First Name Is Blank')
        }else if(!email){
            throw new Error('Email Is Blank')
        }else if(!password){
            throw new Error('Password Is Blank')
        }
        else if(emailcheck!==null){
            throw new Error('Email Is Already Registered For Us!!')
        }
        else{
            const convertpass=await bcrypt.hash(password,10)
    const signupdata=new authTable({fname:fname,lname:lname,email:email,pass:convertpass,dob:dob,mobile:mob})
    //console.log(signupdata)
    signupdata.save()
    res.status(201).json({
        message:`${email} Is Successfully Created`,
        status:201
    })
}
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.login=async(req,res)=>{
    try{
    const {username,password}=req.body
    if(!username){
        throw new Error('Username Should Be Blank')
    }else if(!password){
        throw new Error('Password Should Be Blank')
    }
    const logincheck=await authTable.findOne({email:username})
    //console.log(logincheck)
    if(logincheck!==null){
        const passcompare=await bcrypt.compare(password,logincheck.pass)
        //console.log(passcompare)
        if(passcompare){
            payload={email:username}
            sKey=process.env.KEY
            const token=jwt.sign(payload,sKey)
            //console.log(token)
            res.status(201).json({
                username:username,
                status:201,
                role:logincheck.role,
                token:token
            })
        }else{
            throw new Error('Password Is Not Matched')
        }
    }else{
        throw new Error('Username Is Not Register')
    }
}catch(error){
    res.status(400).json({
        message:error.message,
        status:400
    })
}
}

exports.profiledata=async(req,res)=>{
    try{
    const email=req.params.dd
    const profiledata=await authTable.find({email:email})
    //console.log(profiledata)
    res.status(200).json({
        profiledata,
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
}
}

exports.profilesingledata=async(req,res)=>{
    try{
        const email=req.params.aa
        const profilesingledata=await authTable.findOne({email:email})
        //console.log(profiledata)
        res.status(200).json({
            profilesingledata,
            status:200
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            status:500
        })
    }
    }

exports.profile=async(req,res)=>{
    try{
    const {fname,lname,dob,mob}=req.body
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid Id!!")
    }
    if(!fname){
        throw new Error("First Name Should Not Be Blank")
    }
    else if(!lname){
        throw new Error("Last Name Should Not Be Blank")
    }
    else if(!dob){
        throw new Error("DOB Should Not Be Blank")
    }
    else if(!mob){
        throw new Error("Mobile Number Should Not Be Blank")
    }
    const idcheck=await authTable.find({_id:id})
    if(idcheck.length==0){
        throw new Error("Invalid ID!!")
    }
    await authTable.findByIdAndUpdate(id,{fname:fname,lname:lname,dob:dob,mobile:mob})
    res.status(200).json({
        message:"Profile Successfully Updated",
        status:200
    })}catch(error){
        res.status(500)({
            message:error.message,
            status:500
        })
    }
}

exports.forgot=async(req,res)=>{
    try{
    const {email}=req.body
    if(!email){
        throw new Error("Email Should Not Be Blank")
    }
    const emailcheck=await authTable.findOne({email:email})
    if(emailcheck==null){
        throw new Error("Email is Not Register")
    }
    if(emailcheck){
        let payload={email:email}
        const token=await jwt.sign(payload,process.env.KEY1,{expiresIn:"5m"})
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "boyfake051@gmail.com",
              pass: "tdzd nbbz zzkx kxwa",
            },
          });
          //console.log("Smtp Server is Connected")

          await transporter.sendMail({
            from: "boyfake051@gmail.com", // sender address
            to: email , // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<a href=http://localhost:3000/forgotpassword/${token}>Click To Change Password</a>`, // html body
          });
    }
    res.status(200).json({
        message:"Link Is Successfully Submit In Your Email, Please Check Your Email.",
        status:200
    })
}catch(error){
    res.status(400).json({
        message:error.message,
        status:400
    })
}
}

exports.forgotpassword=(req,res)=>{
    const {npass,cpass}=req.body
}