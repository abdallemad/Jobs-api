const Job = require('../models/Job');
const {StatusCode} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors');

const getAllJobs = async (req,res)=>{
  const {userId} = req.user;
  const job = await Job.find({createdBy:userId}).sort('createdAt')
  res.status(200).json(job);
}

const getJob = async (req,res)=>{
  const {user:{userId},params:{id:jobId}} = req;
  const job = await Job.findOne({_id:jobId,createdBy:userId});
  //this for make sure the job is exists
  if(!job){
    throw new NotFoundError('there is no job match this id')
  }
  res.status(200).json({msg:'work!',job});
}

const updateJob = async (req,res)=>{
  const {
    user:{userId},
    params:{id:jobId},
    body:{company,position}
  } = req;
  if(company.trim() ==='' || position.trim() ===''){
    throw new BadRequestError('company and position must provided')
  }
  const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true , runValidators:true});
  //this for make sure the job is exists
  if(!job){
    throw new NotFoundError('there is no job match this id')
  }
  res.status(200).json({msg:'work!',job});
}

const deleteJob = async (req,res)=>{  
  const {
    user:{userId},
    params:{id:jobId}
  } = req;

  const job = await Job.findOneAndDelete({_id:jobId,createdBy:userId});
  //this for make sure the job is exists
  if(!job){
    throw new NotFoundError('there is no job match this id')
  }
  res.status(200).json({msg:'work!',job});
}

const createJob = async (req,res)=>{
  const {company,position} = req.body;
  const {userId} = req.user
  const job = await Job.create({company,position:position,createdBy:userId});
  res.status(201).json(job);
}

module.exports = {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob
}