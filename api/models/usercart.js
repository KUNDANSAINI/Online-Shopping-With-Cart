const mongoose=require("mongoose")
const catigory = require("./catigory")


const usercartSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        img1:String,
        img2:String
    },
    username:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    qty:{
        type:String
    },
    catigory:{
        type:String,
        required:true
    },
    pDate:{
        type:Date,
        default:new Date(),
        required:true
    }
})


module.exports=mongoose.model('usercart',usercartSchema)