const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors/index')
const jwt = require('jsonwebtoken');

const register = async (req,res)=>{
  const user = await User.create({...req.body})
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token:user.createJWT()})
}


const login = async (req,res)=>{
  const {email,password} = req.body;
  // check for the empty values.
  if(!email || !password){throw new BadRequestError('please provide password and email')}
  // check if the user is exists in the db
  const user = await User.findOne({email});
  if(!user){
    throw new UnauthenticatedError('Invalid Credential')
  }
  // check for password...
  const isMatch = await user.checkPassword(password);
  if(!isMatch){throw new UnauthenticatedError('Please provide correct password');}
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({user:{name:user.name},token});
}

module.exports = {register,login}