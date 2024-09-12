const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { required } = require('joi');
// schema
const User = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'please provide name'],
    minlength:3,
    maxlength:50,
  },
  email:{
    type:String,
    required:[true,'please provide email'],
    match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'
    ],
    unique:true
  },
  password:{
    type:String,
    required:[true,'please provide password'],
  }
})
//middle ware generate the hash
User.pre('save',async function (next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})
//middle ware for the token
User.methods.generateToken = function(){
  const token = jwt.sign({name:this.name,userId:this._id},process.env.JWT_SE,{expiresIn:process.env.JWT_LIFETIME})
  return token
}
User.methods.comparePassword = async function(password){
  const correct = await bcrypt.compare(password,this.password)
  return correct
}

module.exports = mongoose.model('user',User)
