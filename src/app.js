import express from 'express';
import PetRoute from './routes/pets';
import morgan from 'morgan';

const PORT = 3000;

const server = express();

// setup routes path
const buildUrl = (version, path) => `/api/${version}/${path}`;
const PETS_BASE_URL = buildUrl('v1', 'pets');

// use middlewares
// use in development mode only
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('tiny'));
}

// default route
server.get('/', (req, res) => {
  console.log('handling GET request...');
  res.send('Hello from Express');
});

// routes with router
server.use(PETS_BASE_URL, PetRoute);

// start server
server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
