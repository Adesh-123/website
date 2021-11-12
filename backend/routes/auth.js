const router=require('express').Router();
const User = require('../model/User');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

router.post('/register',[
    body('email').isEmail(),
    body('password').isLength({min:8}),
    body('dateofbirth').isDate()
],async(req,res)=>{
    let success=false;
    const errors=validationResult(req.body);
     if(!errors.isEmpty()){
          return res.status(400).json({success,errors});
     }
     const isemailexists = await User.findOne({email:req.body.email});
     if(isemailexists) return res.status(400).json({success,error:'email already exists'});

  try{ 
    
    const salt = await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(req.body.password,salt);
      const user = new User({
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        email:req.body.email,
        password:hashpassword,
        dateofbirth:req.body.dateofbirth,
        phoneNumber:req.body.phonenumber
    });
    const saveuser = await user.save();
    const token =jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
       success =true;
    res.json({success,authtoken:token})
   }catch(err){
       res.status(400).json({success,error:'some error is coming'});
   }
})

router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({min:8})
],async(req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({errors});
    }
   try{
        const user= await User.findOne({email:req.body.email});
        if(!user) return res.status(400).json({success,error:"NO SUCH USER EXIXTS"});

        const validpass=await bcrypt.compare(req.body.password,user.password);
        if(!validpass) return res.status(400).json({success,error:"Invalid credential"});

        const token= jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
        success=true;
        res.header('authToken',token).json({success,authtoken:token});
   }
   catch(err){
        res.status(400).json({success,err});
   }
});

router.get('/alluser',async(req,res)=>{
    const detail=await User.find({})
    let success=true;
    res.json({success,detail});
});

router.get('/profile',fetchuser, async(req,res)=>{
       const user = await User.find({_id:req.body._id});
       let success=true;
       res.send({success,user});
})

router.post('/updateprofile/:id',async(req,res)=>{
    let success=false;
    const updateUser = {};
     let user =await User.findOne({_id:req.params.id});
     if (!user) return res.status(404).json({success,error:"not access"});

        if(req.body.firstName!=="") updateUser.firstName=req.body.firstName ;
        if(req.body.lastName!=="") updateUser.lastName=req.body.lastName;
        if(req.body.email!=="") updateUser.email=req.body.email ;
        if(req.body.dateofbirth!=="") updateUser.dateofbirth=req.body.dateofbirth ;
        if(req.body.phoneNumber!=="") updateUser.phoneNumber=req.body.phoneNumber;



        user = await User.findByIdAndUpdate(req.params.id, {$set: updateUser })
        user= await User.findOne({id:req.params.id})
        success=true;
        res.json({success,user});
    
})


module.exports=router;