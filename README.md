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