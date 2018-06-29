import express from 'express';
import PetRoute from './routes/pets';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

import pets from './../data/pets.json';

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

// view engine setup
server.set('views', path.join(ROOT_DIR, 'views'));
// use ejs for view engine
server.set('view engine', 'ejs');

// view engine setup
server.set('views', path.join(__dirname, 'views'));
// use ejs for view engine
server.set('view engine', 'ejs');

// default route
server.get('/', (req, res) => {
  res.render('index', {
    title: 'Learning EJS',
    pets: pets
  });
});

// routes with router
server.use(PETS_BASE_URL, PetRoute);

// start server
server.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
});
