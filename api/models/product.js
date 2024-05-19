const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    decs:{
        type:String,
        required:true
    },
    moredet:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"In-Stock"
    },
    img:{
        img1:String,
        img2:String
    },
    catigory:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    }

})

module.exports=mongoose.model('product',productSchema)