const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnauthenticatedError} = require('../errors')
const Jwt = require('jsonwebtoken');

const register = async (req,res)=>{
  const user = await User.create(req.body);
  const token = user.generateToken();
  console.log(token)
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
}


const login = async (req,res)=>{

  const {email, password} = req.body
  if(!email || !password) throw new BadRequestError('please provide both email and password');

  const user = await User.findOne({email});
  if(!user) throw new UnauthenticatedError('please provide correct email.');
  
  const token = user.generateToken();

  const correct =await user.comparePassword(password);
  if(!correct) throw new UnauthenticatedError('please provide correct password');
  res.status(StatusCodes.OK).json({user:{name:user.name},token});
}

module.exports = {
  register,
  login
}