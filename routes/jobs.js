const express = require('express');
const router = express.Router()
const {register} = require('../controllers/auth')

const {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob)


module.exports = router