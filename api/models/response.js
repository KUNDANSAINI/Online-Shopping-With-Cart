const mongoose=require('mongoose')



const responseSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Reply"
    }
})



module.exports=mongoose.model('response',responseSchema)