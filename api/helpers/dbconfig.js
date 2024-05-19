const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/reactproject').then(()=>{console.log('Connect To reactproject DB!!')}).catch((error)=>{
    console.log(error.message)
})








