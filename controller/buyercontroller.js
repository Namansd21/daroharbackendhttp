const buyer = require('../models/buyer')

let checkifbuyerexist = async (emailid)=>{
   try{
      let response = await buyer.find({Email:emailid})
      if(response.length ===0)
      {
         return {ok:true,present:false};
      }
      else{
        return {ok:true,present:true};
      }
   }
   catch(err){
     return {ok:false,error:err}
   }
}

let addaddress = async (data,email)=>{
   let {Address}  = data.Address;
   try{
     const resp = await buyer.updateOne({Email:email},{Address})
     return {ok:true,response:resp}
   }
   catch(err)
   {
      return {ok:false,error:err}
   }
}
let createandsavebuyer = async (data)=>{
    let { Name, Email,MailVerified,GoogleId} = data;
    if(MailVerified ===undefined)MailVerified = false
    const obj = new buyer({
      Name,
      Email,
      MailVerified,
      GoogleId
    })
    try{
    const resp = await obj.save();
    return {ok:true,response:resp}
   }
   catch(err)
   {
      return {ok:false,error:err}
   }
}

let getbuyer = async (email)=>{
   try{
    const resp = await buyer.find({Email:email});
    console.log(resp)
    return {ok:true,buyer:resp}
   }
   catch(err)
   {
      return {ok:false,error:err}
   }
}

let deletebuyer = async (email)=>{
    try{
      const result = await buyer.findOneAndDelete({ Email: email });
      return {ok:true,response:result}
    }
    catch(err)
    {
       return {ok:false,error:err}
    }
}
module.exports = {
    checkifbuyerexist,
    createandsavebuyer,
    getbuyer,
    deletebuyer,
    addaddress

}