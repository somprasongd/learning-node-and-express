import express from 'express';
import PetRoute from './routes/pets';

const PORT = 3000;

const server = express();

const buildUrl = (version, path) => `/api/${version}/${path}`;
const PETS_BASE_URL = buildUrl('v1', 'pets');

server.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	next();
});

server.get('/', (req, res) => {
  console.log('handling GET request...');
  res.send('Hello from Express');
});

server.use(PETS_BASE_URL, PetRoute);

server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
