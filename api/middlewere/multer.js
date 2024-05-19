const multer=require('multer')

let storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'../shoppingcart/public')
    },
    filename:function (req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{fieldSize:4*1024*1024}
})

module.exports=upload