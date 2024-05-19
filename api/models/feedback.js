const mongoose=require('mongoose')

const feedbackSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    decs:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    username:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        default: new Date(),
        required:true
    }
})


module.exports=mongoose.model('feedback',feedbackSchema)