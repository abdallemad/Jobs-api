const express = require('express');
const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJob,
  getSingJob,
  updateJob,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJob);
router.route('/:id').patch(updateJob).get(getSingJob).delete(deleteJob);


module.exports = router