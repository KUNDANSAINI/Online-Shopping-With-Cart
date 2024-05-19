const router=require('express').Router()
const productc=require('../controllers/productcontroller')
const multer=require('../middlewere/multer')
const tokenvalid=require('../middlewere/tokenvalidation')



router.post('/addcatigory',tokenvalid,productc.addcatigory)
router.get('/catigory',tokenvalid,productc.catigory)
router.delete('/catidelete/:id',tokenvalid,productc.catidelete)
router.post('/addproduct',tokenvalid,multer.fields([{name:'img'},{name:'img2'}]),productc.addproduct)
router.get('/productdata',tokenvalid,productc.productdata)
router.delete('/productdelete/:id',tokenvalid,productc.productdelete)
router.get('/updateproduct/:id',tokenvalid,productc.updateproduct)
router.put('/proupdate/:id',tokenvalid,multer.fields([{name:'img'},{name:'img2'}]),productc.proupdate)
router.get('/allproduct',tokenvalid,productc.allproduct)
router.get('/moredetail/:id',tokenvalid,productc.moredet)
router.post('/usercartdata',tokenvalid,productc.usercartdata)
router.post('/usercheckout',tokenvalid,productc.usercheckout)
router.post('/myorder',tokenvalid,productc.myorder)
router.delete('/orderdelete/:id',tokenvalid,productc.orderdelete)


module.exports=router