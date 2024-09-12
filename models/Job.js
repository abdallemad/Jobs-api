const mongoose = require('mongoose');

const Job = new mongoose.Schema({
  name:{
    type:String,
    require:[true,'please provide job name'],
  },
  position:{
    type:String,
    require:[true,'please provide position of the job'],
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    require:[true,'please provide user id'],
  },
  status:{
    type:String,
    enum:['pending','decline','interview'],
    default:'pending',
  }
},{timestamps:true});


module.exports = mongoose.model('job',Job);