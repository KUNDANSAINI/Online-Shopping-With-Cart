const mongoose=require('mongoose')

const authSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    createDate:{
        type:Date,
        default:new Date(),
        required:true
    },
    role:{
        type:String,
        default:"User"
    }
})

module.exports=mongoose.model('auth',authSchema)