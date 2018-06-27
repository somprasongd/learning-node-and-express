import express from 'express';
import pets from './../../data/pets.json';

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.json(pets);
});

router.get(`/:petId`, (req, res) => {
  const pet = pets.find(pet => {
    return pet.id === +req.params.petId;
  });
  if (!pet) {
    res.send(`Pet with id ${req.params.petId} not found.`);
  }
  res.json(pet);
});

router.post('/', (req, res) => {
  console.log('handling POST request...');
  res.end();
});

router.patch('/', (req, res) => {
  console.log('handling PATCH request...');  
  res.end();
});

router.put('/', (req, res) => {
  console.log('handling PUT request...');  
  res.end();
});

router.delete('/', (req, res) => {
  console.log('handling DELETE request...');  
  res.end();
});

export default router;