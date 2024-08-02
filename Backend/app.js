const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./DB/mongoDB')

const app = express()
app.use(express.json());

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://ictak-internship-portalclient-qfdo1oylr-veena-s-projects.vercel.app',
      'https://another-allowed-origin.com'
    ];

    // Dynamic pattern for different deployments
    const isAllowed = allowedOrigins.some(pattern => {
      // Match specific origins or use regex patterns
      if (pattern.endsWith('*.vercel.app')) {
        return origin && origin.endsWith('.vercel.app');
      }
      return origin === pattern;
    });

    if (isAllowed || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.get('/', (req, res) => {
  res.send('Welcome to the root path!');
});

//app.use('/uploads', express.static('Uploads'));
app.get('/favicon.ico', (req, res) => res.status(204).end());


const authRouter = require('./Routers/authRouter');
const projectRouter = require('./Routers/projectRouter')
const referenceRouter = require('./Routers/referenceRouter')
const forumRouter = require('./Routers/forumRouter')
const submitRouter = require('./Routers/Postroutes');

app.use('/api', authRouter);
app.use('/api', projectRouter);
app.use('/api', referenceRouter)
app.use('/api', forumRouter)


// app.get('/*',function(req,res){res.sendFile(path.join(__dirname,'../Frontend/index.html'));});

app.use('/api', submitRouter);

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})