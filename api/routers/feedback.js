const router=require('express').Router()
const feedbackc=require('../controllers/feedbackcontroller')
const multer=require('../middlewere/multer')
const tokenvalid=require('../middlewere/tokenvalidation')



router.post('/userfeedback',tokenvalid,multer.single('img'),feedbackc.feedback)
router.post('/response',tokenvalid,feedbackc.userresponse)
router.get('/feedbackdata',tokenvalid,feedbackc.feedbackdata)
router.get('/querydata',feedbackc.querydata)
router.delete('/deletequery/:id',feedbackc.deletequery)
router.get('/singlequery/:id',feedbackc.querysingledata)
router.post('/queryreplay/:id',feedbackc.queryreply)




module.exports=router