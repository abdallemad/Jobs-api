const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company:{
    type:String,
    required:[true,'You must provide company name'],
    maxlength:50
  },
  position:{
    type:String,
    required:[true,'You must provide position name'],
    maxlength:100,
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    required:[true,'please provide the id'],
    ref:'User'
  },
  status:{
    type:String,
    enum:['interview','decline','pending'],
    default:'pending'
  }
},{timestamps:true});



module.exports = mongoose.model('Job',JobSchema);