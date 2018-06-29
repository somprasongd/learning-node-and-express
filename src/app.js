import express from 'express';
import PetRoute from './routes/pets';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = 3000;
const ROOT_DIR = path.parse(__dirname).dir;

const server = express();

// setup routes path
const buildUrl = (version, path) => `/api/${version}/${path}`;
const PETS_BASE_URL = buildUrl('v1', 'pets');

// use middlewares
// parse application/json
server.use(bodyParser.json());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended: true}));
// serve static contents
server.use(express.static(path.join(ROOT_DIR, 'public')));
// use in development mode only
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('tiny'));
}

// default route
server.get('/', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'public', 'index.html'));
});

server.get('/greeting', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

server.get('/download/images/:imageName', (req, res) => {
  res.download(path.join(ROOT_DIR, 'public', 'images', req.params.imageName));
});

// routes with router
server.use(PETS_BASE_URL, PetRoute);

// start server
server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
