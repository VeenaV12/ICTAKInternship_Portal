const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./DB/mongoDB')

const app = express()
app.use(express.json());
const corsOptions = {
  origin: "https://ictak-internship-portalclient-qfdo1oylr-veena-s-projects.vercel.app",
  credentials: true,
  methods: ['POST', 'GET', 'DELETE', 'PUT']
};

app.use(cors(corsOptions));

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