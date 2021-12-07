[English](../README.md) | [Thai](README-th.md)

# ReebA
Ticket booking, Redefined.

## โครงสร้างโปรเจกต์.
โปรเจกต์ประกอบด้วย 3 โฟลเดอร์รวมกัน เรียกว่า monorepo

- `common` สำหรับเก็บฟังก์ชั่นและไทป์ที่ใช้ใน `functions` และ `hosting`
- `functions` สำหรับเซิร์ฟเวอร์ Backend (Fastify)
- `hosting` สำหรับเซิร์ฟเวอร์ Frontend (Vue)

## ก่อนเริ่มงาน.
ขั้นตอนแรก ตรวจสอบเวอร์ชั่นก่อน

- Node.js v14 หรือสูงกว่า
  ตรวจสอบได้โดยการพิมพ์
  ```
  node -v
  ```
  ลงใน Terminal
- `npm` v7 หรือสูงกว่า
  ตรวจสอบได้โดยการพิมพ์
  ```
  npm -v
  ```
  ลงใน Terminal

คุณสามารถดาวน์โหลด Node.js ได้[ที่นี่](https://nodejs.org/en/) (ให้โหลดเวอร์ชั่น LTS)

เมื่อติดตั้ง Node.js แล้ว ให้อัพเดตเวอร์ชั่นของ `npm` โดยพิมพ์
```
npm i -g npm@latest
```
ใน Terminal

## เริ่มทำงาน
```
npm install
```
เพื่อลง Dependencies ที่จำเป็นในการทำงาน

จากนั้น เปิด Terminal 2 อัน แล้วรันคอมมานด์เหล่านี้จากโฟลเดอร์แรกสุดของโปรเจกต์
| Terminal #1             | Terminal #2           |
| ----------------------- | --------------------- |
| `npm run dev:functions` | `npm run dev:hosting` |

คุณจะเห็น API ทำงานที่ `http://127.0.0.1:3000` และเว็บไซต์ทำงานที่ `http://localhost:8080`
