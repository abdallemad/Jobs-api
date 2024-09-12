const User = require('../models/User');
const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllJob = async (req,res)=>{
  const user = req.user;
  const jobs = await Job.find({createdBy:user.userId});
  res.status(StatusCodes.OK).json({jobs})
}

const getSingJob = async (req,res)=>{
  const {userId} = req.user;
  const {id:jobId} = req.params;

  const singleJob = await Job.findOne({_id:jobId,createdBy:userId})
  if(!singleJob) throw new NotFoundError(`There is no job for ID: ${jobId}`)
  res.status(StatusCodes.OK).json({job:singleJob});
}

const updateJob = async (req,res)=>{
  const {company, name,status} = req.body;
  const {userId} = req.user;
  const {id} = req.params;
  // validate values
  if(!company || !name || !status) throw new BadRequestError('please provide all values');
  // update task
  const newJob = await Job.findOneAndUpdate({createdBy:userId,_id:id},{company,name,status},{new:true,runValidators:true});
  // validate task
  if(!newJob) throw new BadRequestError(`un valid id:${id}`)
  
  //send response
  res.status(StatusCodes.OK).json({job:newJob})
  
}

const deleteJob = async (req,res)=>{
  const {userId} = req.user;
  const {id:jobId} = req.params;

  const job = await Job.findOneAndDelete({_id:jobId,createdBy:userId});
  res.status(StatusCodes.OK).json({job})
}
const createJob = async (req,res)=>{
  const {userId} = req.user;
  const {company,position} = req.body;
  const newJob = await Job.create({company,position,createdBy:userId});

  res.status(StatusCodes.CREATED).json({msg:'work',job:newJob})
}

module.exports ={
  getAllJob,
  getSingJob,
  updateJob,
  deleteJob,
  createJob
}