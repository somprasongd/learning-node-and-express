import express from 'express';
import PetRoute from './routes/pets';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const PORT = 3000;

const server = express();

// setup routes path
const buildUrl = (version, path) => `/api/${version}/${path}`;
const PETS_BASE_URL = buildUrl('v1', 'pets');

// use middlewares
// parse application/json
server.use(bodyParser.json());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended: true}));
// use in development mode only
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('tiny'));
}

// default route
server.get('/', (req, res) => {
  console.log('handling GET request...');
  res.send('Hello from Express');
});

server.get('/greeting', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

// routes with router
server.use(PETS_BASE_URL, PetRoute);

// start server
server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
