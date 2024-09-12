const Jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const auth = async (req,res,next)=>{
  const authorization = req.headers.authorization;
  if(!authorization || !authorization.startsWith('Bearer ')) throw new UnauthenticatedError('please provide authorization header');
  const token = authorization.split(' ')[1];
  try {
    const payload = Jwt.verify(token,process.env.JWT_SE);
    req.user =payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError('wrong token')
  }
}

module.exports = auth