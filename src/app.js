import express from 'express';
<<<<<<< HEAD
import PetRoute from './routes/pets';
=======
import morgan from 'morgan';
import pets from './../data/pets.json';
>>>>>>> step-009-express-middleware-part-2

const PORT = 3000;

const server = express();

<<<<<<< HEAD
const buildUrl = (version, path) => `/api/${version}/${path}`;
const PETS_BASE_URL = buildUrl('v1', 'pets');

server.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	next();
});
=======
server.use(morgan('tiny'));
>>>>>>> step-009-express-middleware-part-2

server.get('/', (req, res) => {
  console.log('handling GET request...');
  res.send('Hello from Express');
});

server.use(PETS_BASE_URL, PetRoute);

server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
