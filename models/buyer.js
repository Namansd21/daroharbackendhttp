const mongoose = require('mongoose');

let buyer = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    GoogleId:{
        type:String,
        default:undefined
    },
    Email:{
        type:String,
        required:true
    },
    MailVerified:{
        type:Boolean,
        default:false,
    },
    Address:{
        type:String,
        default:""
    },
})

module.exports = mongoose.model('buyer',buyer);