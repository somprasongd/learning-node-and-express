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

server.get(PETS_BASE_URL, (req, res) => {
  res.json(pets);
});

server.get(`${PETS_BASE_URL}/:petId`, (req, res) => {
  const pet = pets.find(pet => {
    return pet.id === +req.params.petId;
  });
  if (!pet) {
    res.send(`Pet with id ${req.params.petId} not found.`);
  }
  res.json(pet);
});

server.post(PETS_BASE_URL, (req, res) => {
  console.log('handling POST request...');
  res.end();
});

server.patch(PETS_BASE_URL, (req, res) => {
  console.log('handling PATCH request...');  
  res.end();
});

server.put(PETS_BASE_URL, (req, res) => {
  console.log('handling PUT request...');  
  res.end();
});

server.delete(PETS_BASE_URL, (req, res) => {
  console.log('handling DELETE request...');  
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
