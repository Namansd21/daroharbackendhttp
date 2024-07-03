const product = require('../models/products')
const buyercontroller = require('./buyercontroller')
const sellercontroller = require('./sellercontroller')
const mongoose = require('mongoose')
const seller = require('../models/seller')

let addproduct = async(data,selleremail)=>{
    try{
        let resp = await sellercontroller.checkifsellerexist(selleremail);
        if(resp.ok)
        {
            if(resp.present)
            {
                 const session = await mongoose.startSession();
                 await session.startTransaction();
                 try{
                      const sellerdata= await sellercontroller.getseller(selleremail);
                      let addedprod = sellerdata.AddedProducts;
                      let SellerId = seller.obj_id;
                      let SellerAddress = sellerdata.Address;
                      let {Name,Category,Images,Price,Description} = data;
                      if(!Array.isArray(Images) || Images.length ==0 || !Name || !Category || !Price || !Description)
                        {
                            throw new Error('request parameter are not correct')
                        }
                      const obj = new product({
                            Name,
                            Category,
                            Images,
                            Price,
                            Description,
                            SellerAddress,
                            SellerId
                      })

                      const resp = await obj.save();
                      await addedprod.push(resp.obj_id);
                      await sellercontroller.update(selleremail,{AddedProducts:addedprod});
                      console.log(resp)
                      return  {ok:true,response:resp}
                 }
                 catch(err)
                 {
                    await session.abortTransaction();
                    await session.endSession();
                    return {ok:false,error:err}
                 }
            }
            else{
                return {ok:false,error:"seller doesn't exist"}
            }
        }
        else{
            return resp;
        }
        
    }
    catch(err)
    {
        return {ok:false,error:err}
    }
}

const getproductbycategory = async(category)=>
{
    try{
        const resp = await product.find({Category:category});
        return {ok:true,response:resp}
    }
    catch(err)
    {
        return {ok:false,error:err}
    }
}

const getproductbyname= async(name)=>
    {
        try{
            const resp = await product.find({Name:name});
            return {ok:true,response:resp}
        }
        catch(err)
        {
            return {ok:false,error:err}
        }
    }
module.exports = {
    addproduct,
    getproductbycategory,
    getproductbyname
}