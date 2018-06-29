# LEARNING NODE AND EXPRESS

## 1. Nodejs & ES6
:on: step-001-setup-babel-part-1

ต้องติดตั้ง babel ช่วยในการเขียน ES6 (จริงๆ nodejs เขียน es6 ได้ แต่ยังใช้ import ไม่ได้)

- เริ่มจากติดตั้ง module ตามนี้
```
npm i -D babel-cli babel-preset-env babel-preset-stage-0
```

- สร้างไฟล์ .babelrc เพื่อระบุ plugin ที่จะใช้
```json
{
  "presets": [
    "env",
    "stage-0"
  ]
}

```

- แก้ไข script ใน package.json เพื่อให้ babel แปลง es6 -> es5
```json
{
  "scripts": {
    "start": "node src/app.js --exec babel-node -e js"
  }
}

```

- ทดลองสร้างไฟล src/app.js
```javascript
const name = 'Somprasong';
console.log(`Hello ${name}`);
```

- ลองรันจากคำสั่ง `npm start` จะเห็นว่าสามารถใช้งานได้

### 1.1 การใช้ babel compile เป็น ES5
:on: step-002-setup-babel-part-2

- แก้ไข scripts ใน package.json โดย build สำหรับ compile และ serve สำหรับรันไฟล์ที่ compile แล้ว
```json
 "scripts": {
    "start": "node src/app.js --exec babel-node -e js",
    "clean": "rm -rf dist",
    "build": "npm run clean && mkdir dist && babel src -s -d dist", # -s สำหรับสร้าง source map
    "serve": "node dist/app.js"
  }
```

- สั่ง compile โดย `npm run build`
- สั่ง run โดย `npm run serve`

### 1.2 กำหนดเวอร์ชันของ nodejs ที่จะให้ babel complie ออกมา
ถ้าลองสั่ง `npm run build` แล้วไปดูที่ไฟล์ build/app.js จะพบว่า `const name = 'Somprasong'` จะถูกแปลงไปเป็น `var name = 'Somprasong'` ซึ่งจริงๆ แล้ว node เวอร์ชันใหม่ๆ สามารถใช้งาน `const` ได้แล้ว แต่ที่ได้ออกมาเป็น `var` เพราะว่าเราไม่ได้กำหนดเวอร์ชันของ nodejs ที่ต้องการ ซึ่งมีวิธีดังนี้

- กำหนดที่ env ในไฟล์ .babelrc ดังนี้
```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "10.1"
      }
    }],
    "stage-0"
  ],
  "plugins": []
}
```

- สั่ง compile โดย `npm run build`
- ดูในไฟล์ build/app.js ได้เป็น `const name = 'Somprasong'` แล้ว

### 1.3 สร้าง script สำหรับรัน Development กับ Production
- ติดตั้ง bebel-register
```
npm i -D babel-register
```

- สร้างไฟล์ bin/dev สำหรับรัน development mode
```js
require('babel-register');
require('./../src/app');
```

- สร้างไฟล์ bin/prod สำหรับรัน production mode
```js
require('./../dist/app');
```

- แก้ script ที่ไฟล์ package.json ที่ start และเพิ่ม prod

```json
  "scripts": {
    "start": "node bin/dev",
    "clean": "rm -rf dist",
    "build": "npm run clean && mkdir dist && babel src -s -d dist",
    "serve": "SET ENV=production && node dist/app.js",
    "prod": "SET ENV=production && npm run build && node bin/prod"
  },
```
## 2. Use nodemon
:on: step-003-use-nodemon

ใช้เพื่อให้ช่วยรัน node ใหม่ทุกครั้งที่มีการแก้ไขไฟล์

- เริ่มจากติดตั้ง nodemon
```
npm i -D nodemon
```

- แก้ไข start script
```json
{
  "scripts": {
    "start": "nodemon bin/dev",
  }
}
```

- รัน `npm start` ใหม่อีกครั้ง
- ทดลองแก้ไขไฟล์ app.js และบันทึก จะเห็นว่า node จะรันใหม่โดยอัตโนมัติ

## 3. Express

### 3.1 การติดตั้ง
:on: step-004-use-express

- ใช้คำสั่ง `npm i -S express`
- สร้าง server ด้วย express
```js
import express from 'express'

const PORT = 3000;

const server = express();

server.listen(PORT, () => console.log(`Server start on port ${PORT}`));
```

- ทดสอบรัน `npm start`
- ที่ console จะแสดงคำว่า "Server start on port 3000" และเมื่อเปิดผ่าน browser ที่ http://127.0.0.1:3000 จะแสดงว่า "Cannot GET /" แสดงว่าโค้ดทำงานได้ถูกต้อง

### 3.2 Express Route
:on: step-005-express-route-basic

เราสามารถใช้ Express จัดการกับ HTTP Request ได้ด้วยการใช้งาน Express route

- Method GET ใช้สำหรับร้องขอข้อมูล
```js
server.get('/', (req, res) => {
  // แสดงข้อความออกทาง terminal
  console.log('handling GET request...');
  // res.send() ใช้ส่งข้อมูลกลับไปยัง client ตามชนิดข้อมูลที่ส่งไป
  res.send('Hello from Express');

  // แต่ถ้าต้องการส่งข้อมูลที่เป็น json ใช้ res.json() แทนดีกว่า
  // res.json({name: "Somprasong", nickName: "Ball"});
});
```

- Method POST ใช้สำหรับสร้างข้อมูลใหม่
```javascript
server.post(PETS_BASE_URL, (req, res) => {
  console.log('handling POST request...');
  // ใช้สำหรับส่ง response กลับไปยัง client กรณีไม่ได้ใช้ res.send() หรือ res.json()
  res.end();
});
```

- Method PUT ใช้สำหรับอัพเดทข้อมูล ปกติจะใช้แบบอัพเดททับข้อมูลเดิม
```javascript
server.put(PETS_BASE_URL, (req, res) => {
  console.log('handling PUT request...');
  res.end();
});
```

- Method PUT ใช้สำหรับอัพเดทข้อมูลบางส่วน
```javascript
server.patch(PETS_BASE_URL, (req, res) => {
  console.log('handling PATCH request...');
  res.end();
});
```

- Method DELETE ใช้สำหรับลบข้อมูล
```javascript
server.delete(PETS_BASE_URL, (req, res) => {
  console.log('handling DELETE request...');
  res.end();
});
```

#### app.route()
:on: step-006-express-route-handler

กรณีที่มี path เดียวกัน และต้องการทำงานหลาย methods แต่ไม่ใช่ทุก methods (`app.all()`) จะใช้ `app.route()` สร้าง chain ต่อไปเรื่อยๆ เช่น 

```javascript
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
```

### 3.3 Path parameters
:on: step-007-express-path-parameter

เราสามารถส่ง parameter ไปกับ path ที่เรียกไปได้ โดยใช้ `:paramName` และเรียกใช้งานผ่าน `req.params`

```
Route path: /api/v1/pets/:petId
Request URL: http://localhost:3000/api/v1/pets/1
req.params: { "petId": "1" }
```
- จากตัวอย่างข้างบนสามารถเขียนโค้ดได้

```javascript
server.get(`${PETS_BASE_URL}/:petId`, (req, res) => {
  const pet = pets.find(pet => {
    return pet.id === +req.params.petId;
  });
  if (!pet) {
    res.send(`Pet with id ${req.params.petId} not found.`);
  }
  res.json(pet);
});

```

### 3.4 Middleware
:on: step-008-express-middleware

Express สามารถสร้าง middleware เพื่อให้ทำงานแบบ FIFO (First-In-First-Out)

```javascript
// ใช้ server.use() เพื่อสร้าง middleware มันจะทำงานเรียงจากบนลงล่าง
server.use((req, res, next) => {
	// req คือ Object ของ HTTP Request
	// res คือ Object ของ HTTP Response
	// next คือ เรียกฟังก์ชัน next(); เพื่อไปยัง middleware ตัวถัดไป ถ้าไม่เรียกจะไม่ออกไปจาก middleware ตัวนี้		
	next();
});
```

#### ตัวอย่างสร้าง middleware เพื่อเก็บ log

```javascript
server.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	next();
});
```

#### ใช้ morgan เพื่อเก็บ log แต่ละ request
:on: step-009-express-middleware-part-2

- ติดตั้ง `npm i -S morgan`

```javascript
import morgan from 'morgan';

// ...
const server = express();

// use in development mode only
if (process.env.NODE_ENV === 'development') {
  server.use(morgan('tiny'));
}
// ...
```

#### More middlewares
- cors - enable CORS
- helmet - security
- boby-parser - boby parsing middleware
- multer - middleware for handing multipart/form-data
- session
- errorhandler
- serve-favicon
- csurf
- passport
- merror

### 3.5 Router
:on: step-010-express-router

เนื่องจาก Nodejs สามารถสร้างโปรแกรมแบบ Modular ได้ ดังนั้นเราสามารถสร้างไฟล์แยกออกไปใช้ router จัดการกับ method, path ต่างๆ แล้วใช้ middleware โหลดเข้ามา

#### ตัวอย่าง ย้าย route pets ไปสร้างเป็น router แทน

- สร้างไฟล์ src/routes/pets.js

```javascript
import express from 'express';
import pets from './../../data/pets.json';

const router = express.Router();

// สามารถใช้งาน middleware เฉพาะ route นี้
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
```

- เรียกใช้ router ใน app.js

```javascript
import express from 'express';
import PetRoute from './routes/pets';

// ...

const buildUrl = (version, path) => `/api/${version}/${path}`;
const PETS_BASE_URL = buildUrl('v1', 'pets');

server.use(PETS_BASE_URL, PetRoute);

// ...
```

### 3.6 Boby parser
:on: step-011-body-parser

เป็น middleware ที่เอาไว้แปลง request body message ไปเป็น Javascript object (`req.body`)

website: [body-parser](https://www.npmjs.com/package/body-parser)

- ติดตั้ง package `npm i -S body-parser`
- เรียกใช้งาน
```javascript
import body-parser from 'body-parser'

// ...
server.use(morgan('tiny'));
// ไว้หลัง morgan
// parse application/json
server.use(bodyParser.json());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended: true}));

// ...
```

- แก้ไขไฟล์ src/routes/pets.js เพื่อทดสอบเพิ่มสัตว์เลี้ยงตัวใหม่
```javascript
router.post('/', (req, res) => {
  // เอาเฉพาะ name กับ age ออกมาจาก req.body
  const {name, age} = req.body;
  // เพิ่มลงไปใน array
  pets.push({id: pets[pets.length - 1].id + 1, ...{name, age}});
  // ส่งรายการที่เพิ่มใหม่กลับไปยัง client พร้อมสถานะเป็น 201
  res.status(201).json(pets[pets.length - 1]);
});
```

- ทดสอบ
```bash
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"name":"dogdog", "age":1}' \
 http://localhost:3000/api/v1/pets
```

- จะได้ผลลัพธ์กลับมาว่า `{"id":4,"name":"dogdog","age":1}`

### 3.7 Query String
:on: step-012-query-string

Express สามารถดึงค่าที่ส่งมาทาง query string ได้ผ่าน `req.query`
- ตัวอย่างการใช้งาน เมื่อเรียกไปที่ http://localhost:3000/greeting/?name=stamp
```javascript
server.get('/greeting', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});
```

### 3.8 Serving static content
:on: step-013-serving-static-content

ใช้ middleware `server.use(express.static(path.join(__dirname, 'public'));` ซึ่ง src/public คือ ชื่อโฟลเดอร์ที่จะเก็บ static contents ซึ่งเวลาเรียกผ่าน URL ไม่ต้องใส่ src/public เข้าไปด้วย

#### ตัวอย่างการใช้งาน
```javascript
// __dirname คือ ตำแหน่ง dir ของไฟล์ที่เรียกใช้
// แต่ public อยู่ขึ้นไปอีก 1 level จึงต้องขยับขึ้นไป 1 ขั้น
const ROOT_DIR = path.parse(__dirname).dir;

// ...
server.use(express.static(path.join(ROOT_DIR, 'public')));
// ...
```
- ทำสอบเรียกไปที่ [http://localhost:3000/images/doggy.jpg](http://localhost:3000/images/doggy.jpg) จะเห็นว่าหน้า browser จะแสดงรูปออกมาแล้ว

- ถ้าต้องการกำหนด path ของ static content สามารถทำได้เหมือนการใช้ Router เช่น ถ้าต้องการเรียกใช้ผ่าน path `/static/images/doggy.jpg`

```javascript
// ...
server.use('static', express.static(path.join(ROOT_DIR, 'public')));
// ...
```

#### ตัวอย่างการให้ download file จาก static folder
```javascript
server.get('/download/images/:imageName', (req, res) => {
  res.download(path.join(ROOT_DIR, 'public', 'images', req.params.imageName));
});
```

- ทดสอบเรียก [http://localhost:3000/download/images/doggy.jpg](http://localhost:3000/download/images/doggy.jpg)

#### ตัวอย่างแสดงหน้า index.html
```javascript
server.get('/', (req, res) => {
  // เพื่อส่ง index.html กลับไปทำงานที่ browser
  res.sendFile(path.join(ROOT_DIR, 'public', 'index.html'));
});
```

- ทดสอบเรียก [http://localhost:3000](http://localhost:3000)

### 3.9 Template Engines - EJS
:on: step-014-template-ejs

การแสดงหน้าเวบเพจ ปกติข้อมูลมันไม่ได้เป็น static แต่มันจะแสดงข้อมูลแบบ dynamic ดังนั้น จะใช้วิธีทำการสร้าง template เอาไว้ แล้วใช้ res.render('view'); เพื่อ render HTML ไฟล์ และส่งไปกับ response กลับไปยัง browser ซึ่ง Template Engines ที่ใช้ใน Express นั้นมีหลายตัว แต่ที่นิยมใช้กัน คือ EJS

**Website:** [EJS](https://www.npmjs.com/package/ejs)

**Features**
- <% %> ใช้สำหรับแทรกโค้ด javascript ลงไปใน .ejs 
- <%= %> ใช้แสดงค่าที่ส่งมา
- สร้างไฟล์ .ejs แยกส่วนออกไป เช่น header, footer แล้วนำมา include ในไฟล์ content ได้

#### 3.9.1 การใช้งาน EJS

- ติดตั้ง package `npm i -S ejs`
- เรียกใช้งาน
```javascript
import path from 'path';
import ejs from 'ejs';

// ...
// view engine setup
server.set('views', path.join(ROOT_DIR, 'views')); // views คือชื่อโฟลเดอร์ที่เก็ย template
// กำหนด view engine ว่าจะใช้ ejs
server.set('view engine', 'ejs');

// default route
server.get('/', (req, res) => {
  res.render('index');
});

// ...
```

- เพิ่มไฟล์ views/index.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Learning EJS</title>
</head>
<body>
  <h1>Hello EJS</h1>
</body>
</html>
```

- ทดลองรัน [http://localhost:3000/](http://localhost:3000/)

- สามารถส่งค่าจาก express ไปให้ EJS render ได้
```javascript
import pets from './../data/pets.json';


server.get('/', (req, res) => {
  res.render('index', {
    title: 'Learning EJS',
    pets: pets
  });
});
```

- แก้ไขไฟล์ views/index.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><%= title %></title>
</head>
<body>
  <h1>Hello EJS</h1>
  <div>
    <% pets.forEach(pet => { %> 
      <h3>Pet Id: <%= pet.id%> Name: <%= pet.name%> Age: <%= pet.age%></h3>
    <%})%>
  </div>
</body>
</html>
```

- ทดลองรัน [http://localhost:3000/](http://localhost:3000/) จะเห็นว่ามีข้อมูลของ pets มาแสดงแล้ว

#### 3.9.2 การใช้ boostrap กับ EJS
:on: step-015-tempate-ejs-part-2

- ก็ทำเหมือน HTML ปกติ โดยการแทรก โค้ดนี้ไว้ที่ `<head></head>`
```html
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
```

- เรียกใช้ class ของ boostrap
```html
<body>
  <h1>Pets List by EJS</h1>
  <div class="container"> <!-- ตรงนี้ -->
    <% pets.forEach(pet => { %> 
      <h3>Pet Id: <%= pet.id%> Name: <%= pet.name%> Age: <%= pet.age%></h3>
    <%})%>
  </div>
</body>
```

- ลองรีเฟรชหน้าเวบ จะพบว่าสามารถใช้งาน boostrap ได้แล้ว

#### 3.9.3 การใช้ boostrap กับ EJS
:on: step-015-tempate-ejs-part-2

โดยปกติเราจะมีหน้าเพจมากกว่า 1 หน้า อยู่แล้ว เช่น มีหน้า about.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <title><%= title %></title>
</head>
<body>
  <h1>About Page</h1>
</body>
</html>
```

จะสังเกตว่า จะมีส่วนของโค้ดที่ซ้ำๆ ในทุกหน้า ซึ่งเราสามารถแยกส่วนที่ซ้ำๆ ออกเป็นไฟล์เล็กๆ ได้ แล้วค่อยเรียกเข้ามาประกอบกันเป็นหน้าเพจใหม่ โดยใช้ `<% include [EJS filename] %>`

**ตัวอย่าง**
- สร้างไฟล์ EJS Partials footer.ejs, head.ejs, nav.ejs ไว้ใน views/partials

```html
<!-- views/partials/head.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- CSS (load bootstrap from a CDN) -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <title><%= title %></title>
</head>
<body>
```

```html
<!-- views/partials/nav.ejs -->

<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
  
      <div class="navbar-header">
          <a class="navbar-brand" href="#">
              <span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>
              EJS Is Fun
          </a>
  
          <ul class="nav navbar-nav">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
          </ul>
      </div>
  
  </div>
  </nav>
```

```html
<!-- views/partials/footer.ejs -->
  <p class="text-center text-muted">© Copyright 2018 Somprasongd</p>
</body>
</html>
```

- ย้ายไฟล์ index.ejs ไปใน views/partials/pages

- สร้างไฟล์ views/partials/pages/about.ejs