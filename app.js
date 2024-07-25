require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xxs = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();
//connect db
const connectDB = require('./db/connect')
//routers
const authorRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// authorized middle ware for the job route....
const auth = require('./middleware/authentication');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const limiter = rateLimiter({
  windowMs:15 *60*1000,
  max:100
})
// extra packages
app.use(
    limiter   
);
app.use(express.json());
app.use(helmet());
app.use(xxs());
app.use(cors());
// routes
app.use('/api/v1/auth',authorRouter)
app.use('/api/v1/jobs', auth, jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
