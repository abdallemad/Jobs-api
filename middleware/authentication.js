const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt  = require('jsonwebtoken')

const auth = async (req,res, next) =>{
  const {authorization} = req.headers;

  if(!authorization || !authorization.startsWith('Bearer ')){
    throw new BadRequestError('please provide the authorization header');
  }

  const token = authorization.split(' ')[1];

  try {
    const payload =  jwt.verify(token,process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    throw new UnauthenticatedError('token is not valid!!');
  }
}

module.exports = auth;