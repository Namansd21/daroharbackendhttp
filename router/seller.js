const router = require('express').Router();
const controller = require('../controller/sellercontroller')

// get requests


//to check if email exist or not 
router.get('/exist/:email',async (req,res)=>{
   res.send( JSON.stringify(await controller.checkifsellerexist(req.params.email)))
})



//to get the user deta stored using email
 
router.get('/:email',async (req,res)=>{
    try{
      res.send( JSON.stringify(await controller.getseller(req.params.email)));
    }
    catch(err)
    {
       res.send(JSON.stringify({ok:false,error:err}))
    }
 })


//to delete a user using email
router.get('/delete/:email',async (req,res)=>{
    const isexist = await controller.checkifsellerexist(req.params.email);
    if(isexist.ok)
    {
         if(isexist.present)
         {
            res.send(JSON.stringify(await controller.deleteseller(req.params.email)));
         }
         else{
            res.send(JSON.stringify({ok:false,result:'user does not exist'}))
         }
    }
    else{
        res.send(JSON.stringify(isexist));
    }
})
// post requests

//to create a new user
router.post('/create',  async (req,res)=>{
    try{
        const resp = await controller.checkifsellerexist(req.body.Email);
        if(resp.ok)
        {
            if(!resp.present){
            res.send(JSON.stringify({ok:true,alreadyexist:false,response:await controller.createandsaveseller(req.body)} ));
            }
            else{
                res.send(JSON.stringify( {ok:true,alreadyexist:true})) ;
            }
        }
        else{
            res.send(JSON.stringify(resp));
        }}
    catch(err)
    {
        res.send( JSON.stringify({ok:false,error:err}))
    }

})



module.exports = router;