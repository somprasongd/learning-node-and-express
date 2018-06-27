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

- ทดลองสร้างไฟล app.js
```javascript
const name = 'Somprasong';
console.log(`Hello ${name}`);
```

- ลองรันจากคำสั่ง `npm start` จะเห็นว่าสามารถใช้งานได้

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