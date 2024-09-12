// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'some thing went wrong please try again'
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  // this check for DUBLICATED EMAIL
  if(err.code && err.code == 11000){
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `there is user with this email: ${err?.keyValue?.email}`
  }

  //this for empty field
  if(err.name && err.name === 'ValidationError'){
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors).map(singleError=>{
      return singleError.message
    }).join(' and ')
  }

  // cast id 
  if(err.name && err.name  === 'CastError'){
    customError.statusCode = StatusCodes.BAD_REQUEST;
  customError.msg = `un valid ID: ${err.value}`
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
  return res.status(customError.statusCode).json({ msg:customError.msg })
}

module.exports = errorHandlerMiddleware
