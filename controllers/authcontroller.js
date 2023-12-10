var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
var users = require('../models/user')
var verifyToken = require('../middleware/verifytokenuser');
const bcrypt = require('bcrypt')
const Joi = require('joi');

router.post('/userlogin', 
 
async function(req, res, next){
  
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });
  const { error } = schema.validate(req.body);
 
  if (error) {
    return res.status(500).json({errors:error.details[0].message});
  }

  try{
    const user = await users.findOne({email:req.body.email})
    if(!user){
      return res.status(409).json({ errors: "Account Not Found" });
    }
    else{

      let passwordIsValid = await bcrypt.compareSync(req.body.password, user.password)
        if(passwordIsValid)
        {
          let token = jwt.sign({ id: user._id,name: user.name}, global.config.usersecretKey, {
            algorithm: global.config.algorithm,
            expiresIn: '7d'
        });
        const updateData= await users.findOneAndUpdate({'_id':user._id}, {'remember_token':token,});
        res.status(200).json({
          message: `Hi ${user.name}, welcome back to Zap-Bazar`,
          jwtoken: token,
          data:updateData
        });
         
        }
        else{
          return res.status(400).json({msg:"Invalid Password"});
        }
    }
    
  }
  catch(err){
    console.log(err)
    res.status(500).json({
      message: 'Something went wrong , please try again later'
    });
  }
  
});

router.post('/userSignup', async(req,res,next)=>{
  
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });
  const { error } = schema.validate(req.body);

  console.log("body",req.body);
  if (error) {
    return res.status(400).json({errors:error.details[0].message});
  }
  else{
    const user = await users.findOne({email:req.body.email})
    if(user)
    {
      return res.status(409).json({ errors: "Email already registered" });
    }
    else{
      let token = jwt.sign({ id: user?._id,name: req.body.name}, global.config.usersecretKey, {
        algorithm: global.config.algorithm,
        expiresIn: '7d'
    });

      const createUser = new users({
        'name':req.body.name,
        'email':req.body.email,
        'password':bcrypt.hashSync(req.body.password,10),
        'remember_token':token
      })
  
      const saveUser = await createUser.save()
      return res.status(201).send({ data:saveUser,success: "Signup successfully" });
    }
    
  }
});

router.post('/test',(req,res)=>{
  return res.status(200).json({ data: req.body }); 
})

module.exports = router;