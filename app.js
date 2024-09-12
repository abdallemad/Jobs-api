require('dotenv').config();
require('express-async-errors');
// securety pages 
const helmet = require('helmet')
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss =require('xss-clean')

const express = require('express');
const app = express();
//db
const connectDB = require('./db/connect')
// routes
const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');

// middle wares
const notFound = require('./middleware/not-found');
const errorHandlerMiddleWare = require('./middleware/error-handler');
const auth = require('./middleware/authentication')

//middle ware
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
}))
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());

//routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/jobs',auth,jobsRoute);

// middle wares.
app.use(notFound);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;

const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port,()=>{
      console.log(`server is listening on port ${port}`)
    })
  } catch (error) {
    console.log('server killed');
  }
}
start()