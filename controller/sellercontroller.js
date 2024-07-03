const seller = require('../models/seller')

let checkifsellerexist = async (emailid)=>{
   try{
      let response = await seller.find({Email:emailid})
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

let createandsaveseller = async (data)=>{
    let { Name, Email,Address,UpiId,Phno} = data;
    if(!Name || !Email || !Address || !UpiId || !Phno)
    {
        return {ok:false,error:'all required info not provided'}
    }
    const obj = new seller({
      Name,
      Email,
      Address,
      UpiId,
      Phno
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

let getseller = async (email)=>{
   try{
    const resp = await seller.find({Email:email});
    console.log(resp)
    return {ok:true,seller:resp}
   }
   catch(err)
   {
      return {ok:false,error:err}
   }
}

let update = async (email,updatedata)=>{
   try{
      const resp = seller.updateOne({Email:email},updatedata);
      return {ok:true,response:resp};
   }
   catch(error)
   {
      return {ok:false,error:err}
   }
}
let deleteseller = async (email)=>{
    try{
      const result = await seller.findOneAndDelete({ Email: email });
      return {ok:true,response:result}
    }
    catch(err)
    {
       return {ok:false,error:err}
    }
}
module.exports = {
    checkifsellerexist,
    createandsaveseller,
    getseller,
    deleteseller,
    update
}