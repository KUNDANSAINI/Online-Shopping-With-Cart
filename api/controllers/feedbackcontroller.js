const feedbackTable = require('../models/feedback')
const responseTable=require('../models/response')
const mongoose=require('mongoose')
const nodemailer=require('nodemailer')

exports.feedback = (req, res) => {
    try {
        //console.log(req.body)
        const { name, decs, username } = req.body
        if (!name) {
            throw new Error("Name Should Be Not Blank")
        }
        if (!decs) {
            throw new Error("Decripation Should Not Be Blank")
        }
        if (req.file) {
            let filename = req.file.filename
            var newRecord = new feedbackTable({ name: name, decs: decs, img: filename, username:username })
        } else {
            var newRecord = new feedbackTable({ name: name, decs: decs, username:username })
        }
        newRecord.save()
        res.status(201).json({
            status: 201
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 400
        })
    }
}

exports.userresponse=async(req,res)=>{
    try{
    const {email}=req.body
    if(!email){
        throw new Error("Please Enter Your Email")
    }
    const emailcheck=await responseTable.findOne({email:email})
    if(emailcheck!==null){
        throw new Error("Your Email Is Already Exist Please Wait For Response And Check Your Email")
    }else{
    var emaildata=new responseTable({email:email})
    emaildata.save()
    }
    res.status(201).json({
        status:201
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.deletequery=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID!!")
    }
    const checkid=await responseTable.find({_id:id})
    if(checkid.length==0){
        throw new Error("Invalid Id!!")
    }
    await responseTable.findByIdAndDelete(id)
    res.status(200).json({
        message:"Query Successfully Deleted",
        status:200
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.feedbackdata=async(req,res)=>{
    try{
    const feedbackalldata=await feedbackTable.find()
    res.status(200).json({
        apidata:feedbackalldata,
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
}
}

exports.querydata=async(req,res)=>{
    try{
    const querydata=await responseTable.find()
    if(querydata.length==0){
        throw new Error("Data Not Found")
    }
    res.status(200).json({
        querydata,
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
}
}

exports.querysingledata=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid ID!!")
    }
    const idcheck=await responseTable.find({_id:id})
    if(idcheck.length==0){
        throw new Error("Invalid ID!!")
    }
    const singledata=await responseTable.findById(id)
    res.status(200).json({
        singledata,
        status:200
    })
  }catch(error){
    res.status(400).json({
        message:error.message,
        status:400
    })
  }
}

exports.queryreply=async(req,res)=>{
    //console.log(req.body)
    try{
      const {eto,efrom,subject,ebody}=req.body
      const id=req.params.id
      if(!mongoose.Types.ObjectId.isValid(id)){
          throw new Error("Invalid ID!!")
        }
        const idcheck=await responseTable.find({_id:id})
        if(idcheck.length==0){
          throw new Error("Invalid ID!!")
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "boyfake051@gmail.com",
                pass: "tdzd nbbz zzkx kxwa",
            },
        });
        //console.log("Smtp Server Is Connected")
        
        await transporter.sendMail({
            from: efrom, // sender address
            to: eto, // list of receivers
            subject: subject, // Subject line
            text: ebody, // plain text body
            //html: "<b>Hello world?</b>", // html body
        });
        await responseTable.findByIdAndUpdate(id,{status:"Replied"})
        res.status(200).json({
        message:"User Successfully Replaied!!",
        status:200
      })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}