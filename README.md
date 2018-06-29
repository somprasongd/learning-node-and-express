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
  # แสดงข้อความออกทาง terminal
  console.log('handling GET request...');
  # res.send() ใช้ส่งข้อมูลกลับไปยัง client ตามชนิดข้อมูลที่ส่งไป
  res.send('Hello from Express');

  # แต่ถ้าต้องการส่งข้อมูลที่เป็น json ใช้ res.json() แทนดีกว่า
  # res.json({name: "Somprasong", nickName: "Ball"});
});
```

- Method POST ใช้สำหรับสร้างข้อมูลใหม่
```javascript
server.post(PETS_BASE_URL, (req, res) => {
  console.log('handling POST request...');
  # ใช้สำหรับส่ง response กลับไปยัง client กรณีไม่ได้ใช้ res.send() หรือ res.json()
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