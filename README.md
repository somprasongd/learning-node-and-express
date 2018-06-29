# LEARNING NODE AND EXPRESS

## 1. Nodejs & ES6
<<<<<<< HEAD
:on: step-001-setup-babel-part-1

=======
>>>>>>> 4c82bb026e4d0dd9c9fca2be08e1dbafd818c8d6
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

### การใช้ babel compile เป็น ES5
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

### กำหนดเวอร์ชันของ nodejs ที่จะให้ babel complie ออกมา
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

### สร้าง script สำหรับรัน Development กับ Production
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
<<<<<<< HEAD
## 2. Use nodemon
:on: step-003-use-nodemon

=======

## 2. Use nodemon
>>>>>>> 4c82bb026e4d0dd9c9fca2be08e1dbafd818c8d6
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
