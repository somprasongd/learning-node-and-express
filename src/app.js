import express from 'express';

const PORT = 3000;

const server = express();

server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
