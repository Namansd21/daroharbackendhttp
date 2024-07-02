const mongoose = require('mongoose');

let buyer = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    googleid:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    mailverified:{
        type:Boolean,
        default:false,
    },

})

module.exports = mongoose.Model('buyer',buyer);