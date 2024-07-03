const mongoose = require('mongoose');

let seller = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    UpiId:{
        type:String,
        required:true
    },
    Phno:{
        type:String,
        required:true
    },
    AddedProducts:{
       type:[String],
       default:[]
    },
    Balance:{
        type:Number,
        Default:0
    },
    Sales:{
        type:Object,
        default:{}  
    }

})

module.exports = mongoose.model('seller',seller);