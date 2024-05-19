const mongoose=require('mongoose')

const catigorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('cati',catigorySchema)