const express=require('express')
const app=express()
app.use(express.json())
const authRouter=require('./routers/auth')
const productRouter=require('./routers/product')
const feedbackRouter=require('./routers/feedback')
require('./helpers/dbconfig')

require('dotenv').config()
const morgan=require('morgan')





app.use(morgan('dev'))
app.use('/product',productRouter)
app.use('/feedback',feedbackRouter)
app.use('/auth',authRouter)
app.listen(process.env.PORT,()=>{console.log(`Node Server Is Running On Port ${process.env.PORT}`)})