const router = require('express').Router();
const controller = require('../controller/productcontroller')


router.post('/upload',async (req,res)=>{
    res.send(JSON.stringify(await controller.addproduct(req.body,req.body.Email)))
})

router.get('/get/name/:ne',async (req,res)=>{
    res.send(JSON.stringify(await controller.getproductbyname(req.params.ne) ))
})

router.get('/get/category/:ca',async (req,res)=>{
    res.send(JSON.stringify(await controller.getproductbycategory(req.params.ca) ))
})

module.exports = router;