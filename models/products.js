const mongoose = require('mongoose')

let product = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true,
    },
    Images:{
       type:[String],
       default :[]
    },
    Price:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    SellerId:{
        type:String,
        required:true,
    },
    SellerAddress:{
        type:String,
        required:true,
    },

})

module.exports = mongoose.model('product',product)