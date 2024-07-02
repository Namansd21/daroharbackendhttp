const router = require('express').Router();
const passport = require('passport');
const passportconfig = require('./passportconfig')
const cookiesession = require('cookie-session')

router.use(cookiesession({
    name:'Session', 
    maxAge:24*60*60*1000,
    keys:[process.env.cookiekey,process.env.COOKIE_KEY_2]
}))

router.use(passport.initialize());
router.use(passport.session());




passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})


//googlecall
router.get('/google',passport.authenticate('google',{
    scope:['email','profile'],
    prompt:"consent",
    acessType:'offline'
}))


router.get('/google/callback',passport.authenticate('google',{
    failureRedirect:'http://localhost:3000',
    successRedirect:'/'
}),()=>{
    console.log('google called us back') 
})


router.post('/emaillogin',passport.authenticate('local',{
    failureRedirect:'http://localhost:3000',
    successRedirect:'/'
}))


router.get('/isloggedin',(req,res)=>{
    res.send(JSON.stringify({result:req.user?true:false}))
})
//logout
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})
module.exports = router;
