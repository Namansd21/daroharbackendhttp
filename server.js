const express = require('express')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const app = express();
const cors = require('cors')
const auth = require('./router/auth/auth')
const email = require('./router/email/mail')
const mongoose = require('mongoose')
const product = require('./router/product')
const buyer = require('./router/buyer')
const seller = require('./router/seller')

// builtin middlewares
app.use(helmet())
app.use(cors("*"))
// app.use(express.static(path.join(__dirname,'..','public')))      // add path accordingly 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
  

 

//cookies
 


app.use('/product',product)
app.use('/email',email)
app.use('/auth',auth)
app.use('/buyer',buyer) 
app.use('/seller',seller)
app.get('/',(req,res)=>{
    res.send('hello')
})

// starting server and makind database connection
async function serverstart(){
    await mongoose.connect("mongodb+srv://user1:dummy@cluster0.yxrhmgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log('database connected...')
    app.listen(3000,()=>{
        console.log('server is listening....')
    })
    
}

serverstart();
  