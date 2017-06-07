const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const moment =  require('moment');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  const expires = moment().add('days', 1).valueOf();
  //sub == subject  , iat = issue at time
  return jwt.encode({ sub: user.id , iat : timestamp , exp : expires } , config.secret);
}

exports.signin = function(req , res , next){
  //User has already had their email and password  auth'd
  //We just ness to give them a token
  // req.user << passport done()
  res.send({token : tokenForUser(req.user)});
}

exports.signup = function(req , res , next){
  console.log(req.body);
  const email = req.body.email;
  const password =req.body.password;

  if(!email || !password){
    return res.status(422).send({error : 'data Invalid'});
  }

  // See if a user with the given email exists
  User.findOne({ email : email} , function (err , existingUser){
      if(err) {
        return next(err);
      }
      if(existingUser){
        return res.status(422).send({error : 'Email is in use'});
      }

      const user = new User({
        email : email ,
        password : password
      })

      user.save(function(err){
        if(err) {return next(err);}
        //respones
        res.json({ token : tokenForUser(user)});
      });
  });


}
