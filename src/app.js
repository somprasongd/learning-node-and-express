import express from 'express';
import pets from './../data/pets.json';

const PORT = 3000;

const server = express();

server.get('/', (req, res) => {
  console.log('handling GET request...');
  res.send('Hello from Express');
});

const buildUrl = (version, path) => `/api/${version}/${path}`;
const PETS_BASE_URL = buildUrl('v1', 'pets');

server.route(PETS_BASE_URL)
  .get((req, res) => {
    res.json(pets);
  })
  .post((req, res) => {
    console.log('handling POST request...');
    res.end();
  })
  .put((req, res) => {
    console.log('handling PUT request...');
    res.end();
  })
  .patch((req, res) => {
    console.log('handling PATCH request...');
    res.end();
  })
  .delete((req, res) => {
    console.log('handling DELETE request...');
    res.end();
  });

server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
