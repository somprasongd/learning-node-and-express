# LEARNING NODE AND EXPRESS

## Nodejs & ES6
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
    "start": "node ./app.js --exec babel-node -e js"
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
- แก้ไข scripts ใน package.json โดย build สำหรับ compile และ serve สำหรับรันไฟล์ที่ compile แล้ว
```
 "scripts": {
    "start": "nodemon lib/index.js --exec babel-node -e js",
    "clean": "rm -rf dist",
    "build": "npm run clean && mkdir dist && babel src -s -d dist", # -s สำหรับสร้าง source map
    "serve": "node dist/app.js"
  }
```

- สั่ง compile โดย `npm run build`
- สั่ง run โดย `npm run serve`

## Use nodemon
ใช้เพื่อให้ช่วยรัน node ใหม่ทุกครั้งที่มีการแก้ไขไฟล์

- เริ่มจากติดตั้ง nodemon
```
npm i -D nodemon
```

- แก้ไข start script
```json
{
  "scripts": {
    "start": "nodemon ./app.js --exec babel-node -e js"
  }
}
```

- รัน `npm start` ใหม่อีกครั้ง
- ทดลองแก้ไขไฟล์ app.js และบันทึก จะเห็นว่า node จะรันใหม่โดยอัตโนมัติ

