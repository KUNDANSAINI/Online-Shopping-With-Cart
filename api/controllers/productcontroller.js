const productTable=require('../models/product')
const catigoryTable=require('../models/catigory')
const usercartTable=require('../models/usercart')
const mongoose=require('mongoose')


exports.addcatigory=(req,res)=>{
    try{
    const {name}=req.body
    if(!name){
        throw new Error('Please Enter Catigory Name')
    }
    const newData=new catigoryTable({name:name})
    newData.save()
    res.status(201).json({
        message:'Successfully Data Inserted',
        status:201
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.catigory=async(req,res)=>{
    try{
    const alldata=await catigoryTable.find()
    res.status(200).json({
        alldata,
        status:200
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.catidelete=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid Id!!")
    }
    await catigoryTable.findByIdAndDelete(id)
    res.status(200).json({
        message:'Data Successfully Deleted',
        status:200
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.addproduct=(req,res)=>{
    try{
    const {name,decs,price,catigory,qty,moredet}=req.body
    const img=req.files['img'][0].filename
    const img2=req.files['img2'][0].filename
    
    if(!name){
        throw new Error("Please Enter Product Name")
    }
    else if(!decs){
        throw new Error("Please Enter Product Decripation")
    }
    else if(!moredet){
        throw new Error("Please Enter Product Other Details")
    }
    else if(!price){
        throw new Error("Please Enter Product Price")
    }
    else if(!catigory){
        throw new Error("Please Enter Product Catigory")
    }else{
  const newProduct=new productTable({name:name,decs:decs,price:price,catigory:catigory,img:{img1:img,img2:img2},qty:qty,moredet:moredet})
   // console.log(newProduct)
   newProduct.save()
    res.status(201).json({
        message:"Product Successfully Added!!",
        status:201
    })}
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.productdata=async(req,res)=>{
    try{
    const productData=await productTable.find()
    res.status(200).json({
        productData,
        status:200
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.productdelete=async(req,res)=>{
    try{
    var id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error('Invalid Id')
    }
    const idcheck=await productTable.find({_id:id})
    //console.log(idcheck.length)
    if(idcheck.length==0){
        throw new Error("Invalid Id!!")
    }
    await productTable.findByIdAndDelete(id)
    res.status(200).json({
        message:"Product Successfully Deleted!",
        status:200
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.updateproduct=async(req,res)=>{
    try{
    const id=req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid Id!!')
        }
        const idcheck=await productTable.find({_id:id})
        if(idcheck.length==0){
            throw new Error("Invalid Id!!")
        }
        const apidata=await productTable.findById(id)
        res.status(200).json({
            apidata,
            status:200
        })
    }
    catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.proupdate=async(req,res)=>{
    try{
        let id=req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid ID!!")
        }
        const idcheck=await productTable.find({_id:id})
        if(idcheck.length==0){
            throw new Error("Invalid Id!!")
        }
        const {name,decs,price,qty,status,moredet}=req.body
        let a=Object.keys(req.files)
        //console.log(a.length)
        if(!name){
            throw new Error("Please Enter This Product Name")
        }else if(!decs){
            throw new Error("Please Enter This Product Decripation")
        }else if(!price){
            throw new Error("Please Enter This Product Price")
        }else if(!qty){
            throw new Error("Please Enter This Product Quentity")
        }
        else if(!moredet){
            throw new Error("Please Enter This Product Details Should Be Not Blank")
        }
        else if(a.length){
            const img=req.files['img'][0].filename
            const img2=req.files['img2'][0].filename
            await productTable.findByIdAndUpdate(id,{name:name,decs:decs,price:price,qty:qty,status:status,img:{img1:img,img2:img2},moredet:moredet})
        }
        else{
        await productTable.findByIdAndUpdate(id,{name:name,decs:decs,price:price,qty:qty,status:status,moredet:moredet})
        }
        res.status(201).json({
        message:"Data Successfully Updated!!",
        status:201
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.allproduct=async(req,res)=>{
    try{
    const alldata=await productTable.find({status:"In-Stock"})
    if(alldata.length==0){
        throw new Error("No Record Found")
    }
    res.status(200).json({
        alldata,
        status:200
    })
    }catch(error){
        res.status(500).json({
            message:error.message,
            status:500
        })
    }
}

exports.moredet=async(req,res)=>{
    try{
    const id=req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid Id!!")
    }
    const checkid=await productTable.find({_id:id})
    if(checkid.length==0){
        throw new Error("Invalid Id!!")
    }
    const moredata=await productTable.find({_id:id})
    //console.log(moredata)
    res.status(200).json({
        moredata,
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
    }
}

exports.usercartdata=async(req,res)=>{
    try{
    const {ids}=req.body
    const idcheck=await productTable.find({_id:ids})
    if(idcheck.length==0){
        throw new Error("Invalid Id!!")
    }
    const userdata=await productTable.find({_id:{$in:ids}})
    //console.log(userdata)
    res.status(200).json({
        userdata,
        status:200
    })
    }catch(error){
        res.status(500).json({
            message:error.message,
            status:500
        })
    }
}

exports.usercheckout=async(req,res)=>{
    try{
    const {cart,loginame}=req.body
    const checkoutid=(Object.keys(cart.items))
    if(!checkoutid.length){
        throw new Error("Cart Items Not Valid")
    }
    if(!loginame){
        throw new Error("Username Not Valid")
    }
    var usercheckdata=await productTable.find({_id:{$in:checkoutid}})
    //console.log(usercheckdata)
    usercheckdata.forEach((value)=>{
        const productqty=cart.items[checkoutid]
        //console.log(value.price*productqty)
        var userproduct=new usercartTable({name:value.name,img:{img1:value.img.img1,img2:value.img.img2},qty:productqty,price:value.price*productqty,catigory:value.catigory,username:loginame})
        userproduct.save()
    })
    res.status(201).json({
        message:"Successfully Checkout",
        status:201
    })
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
    }
}

exports.myorder=async(req,res)=>{
    try{
    const {loginame}=req.body
    if(!loginame){
        throw new Error("Product Not Found")
    }
    const orderdata=await usercartTable.find({username:loginame})
    //console.log(orderdata)
    res.status(201).json({
        orderdata,
        status:201
    })
}catch(error){
    res.status(400).json({
        message:error.message,
        status:400
    })
}
}

exports.orderdelete=async(req,res)=>{
    try{
    const id=req.params.id
    //console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid Id!")
    }
    const idCheck=await usercartTable.find({_id:id})
    if(idCheck.length==0){
        throw new Error("Invalid Id!")
    }
    await usercartTable.findByIdAndDelete(id)
    res.status(200).json({
        message:"Order Successfully Cancel",
        status:200
    })
}catch(error){
    res.status(500).json({
        message:error.message,
        status:500
    })
}
}