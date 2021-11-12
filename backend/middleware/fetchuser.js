const jwt = require('jsonwebtoken');


const fetchuser=(req,res,next)=>{
    const token = req.header('auth-token');
   if(!token){
       return res.status(401).send({err:"Please try with valid token"});
   }
   try{
       const data=jwt.verify(token,process.env.TOKEN_SECRET);
       if(!data) return res.send("not-found");
       req.body=data;
       next();
   }catch{
         res.status(401).send('sever error');
   }
}


module.exports =  fetchuser;
