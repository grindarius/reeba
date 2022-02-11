[English](../README.md) | [Thai](README-th.md)

<p align="center">
  <img src="https://user-images.githubusercontent.com/60266519/147319453-ac26e0ca-eca1-43a9-9aea-79426e3fbf6a.png" alt="ReebA Logo">
</p>
<h3 align="center">
  นิยามใหม่แห่งการแสดง
</h3>

## ReebA คืออะไร
ReebA (อ่านว่า รีบ-อะ) เป็นเว็บไซต์เชิงสังคมสำหรับจัดงานคอนเสิร์ตหรือกิจกรรมประเภทใด ๆ โดยที่คุณสามารถสมัครสมาชิกและซื้อตั๋วจากโชว์ใหญ่ ๆ ได้ง่ายดายผ่านเว็บไซต์ของเรา รวมไปถึงการแสดงจากนักแสดงโชว์มือสมัครเล่น ที่สนใจจะแสดงโชว์พร้อมขายตั๋วและเก็บเงิน ครบวงจรในที่เดียว สำหรับผู้ใช้งานก็ยังสามารถซื้อตั๋ว และถ่ายโอนตั๋วให้ผู้ใช้งานคนอื่นได้โดยตรง *โดยไม่ต้องพิมพ์ตั๋วออกมาแม้แต่ใบเดียว*

โปรเจกต์ของเราประกอบไปด้วย
- **ReebA.com**: เว็บแอพพลิเคชั่น
- **ReebA API**: API สำหรับให้เว็บแอพติดต่อกับ PostgreSQL

## โครงสร้างเทคโนโลยี
### ReebA.com
- [Vuejs](https://v3.vuejs.org/) เป็นฐานให้กับเว็บแอพพลิเคชั่น
- [Tailwindcss](https://tailwindcss.com/) สำหรับตกแต่งเว็บแอพพลิเคชั่นโดยไม่ต้องเขียน CSS
- [d3.js](https://d3js.org) สำหรับสร้างกราฟให้กับ Admin
- [Vite](https://vitejs.dev/) สำหรับคอมไพล์ Vuejs application

### ReebA API.
- [Fastify](https://www.fastify.io/) เป็นฐานสำหรับเซิร์ฟเวอร์ API
- [PostgreSQL](https://www.postgresql.org/) สำหรับ Database

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
- `pnpm` v6.26.0 หรือสูงกว่า
  ตรวจสอบได้โดยการพิมพ์
  ```
  pnpm -v
  ```
  ลงใน Terminal
- PostgreSQL v14.1 *ตรงตัวเท่านั้น*
  ตรวจสอบได้โดยการพิมพ์
  ```
  psql -V postgres
  ```
  ลงใน Terminal

คุณสามารถดาวน์โหลด Node.js ได้[ที่นี่](https://nodejs.org/en/) (ให้โหลดเวอร์ชั่น LTS)
คุณสามารถดาวน์โหลด PostgreSQL ได้[ที่นี่](https://www.postgresql.org/download/windows/)

เมื่อติดตั้ง Node.js แล้ว ให้อัพเดตเวอร์ชั่นของ `npm` โดยพิมพ์
```
npm i -g npm@latest
```
ใน Terminal

และทำการติดตั้ง `pnpm` โดยพิมพ์
```
npm i -g pnpm
```
ใน Terminal

## เริ่มทำงาน
### ก่อนอื่นใด
รันคอมมานด์นี้จากโฟลเดอร์แรกของโปรเจกต์
```
pnpm install
```
เพื่อลง Dependencies ที่จำเป็นในการทำงาน

หากมีการย้าย branch เพื่อไปดูความคืบหน้าของ branch คนอื่น รัน
```
pnpm install --frozen-lockfile
```
เนื่องจาก `pnpm install --frozen-lockfile` จะทำการติดตั้ง dependencies *โดยไม่เปลี่ยนแปลงเนื้อหาของ `pnpm-lock.yaml`* ถ้าเกิด error ขึ้นระหว่างการติดตั้งด้วยคอมมานด์ `pnpm install --frozen-lockfile` จึงค่อยกลับมาใช้คอมมานด์ `pnpm install`

### การติดตั้ง Database (reebA API)
**คำเตือน: หัวข้อนี้จำเป็นต้องทำแค่ครั้งแรกครั้งเดียว**

ที่ ReebA เราใช้ [PostgreSQL](https://www.postgresql.org/) เพื่อเก็บข้อมูลการใช้งานของผู้ใช้งาน หัวข้อนี้จะทำให้คุณสามารถสร้าง database ไว้ใช้พัฒนาในเครื่องของคุณได้ แต่อย่างแรก

- คุณจะต้องมี PostgreSQl ติดตั้งอยู่ในเครื่องของคุณ
- คุณจะต้องรู้ master password ของ user ชื่อ `postgres` (จะมีการถามรหัสที่จะใช้ ระหว่างการติดตั้ง)
- คุณต้องสามารถใช้คอมมานด์ `psql` ได้

ถ้าสามารถทำได้ทั้ง 3 ข้อ คุณพร้อมที่จะทำงานแล้ว นี่คือวิธีที่จะทำให้ database ใช้งานได้

**คำเตือน: ต้องทำตามคำแนะนำที่ปรากฏอย่างเคร่งครัด มิฉะนั้นคุณอาจได้ database ที่มีปัญหา และยากต่อการแก้ไขอย่างมาก**

- เปิด Terminal ตัวโปรดของคุณ (แนะนำให้ใช้ [Git Bash](https://git-scm.com/downloads) หรือ `Command Prompt` ใน [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab) ไม่แนะนำ `PowerShell`) ในโฟลเดอร์ `backend`

- รันคอมมานด์
  ```
  psql -U postgres
  ```
  แล้วใส่รหัสผ่านของบัญชี `postgres`

  คุณจะเห็น terminal มีหน้าตาประมาณนี้
  ```
  psql (14.1)
  Type "help" for help.

  postgres=#
  ```
  หมายความว่าคุณได้ทำการล็อกอินเข้ามาแล้ว

- รันคอมมานด์
  ```
  postres=# CREATE DATABASE "reeba";
  ```

  คุณจะเห็น
  ```
  CREATE DATABASE
  ```
  นี่หมายความว่าคุณได้ทำการสร้าง database ชื่อ `reeba` เรียบร้อยแล้ว

- รันคอมมานด์
  ```
  postgres=# \c postgres://postgres@localhost:5432/reeba
  ```
  ใส่รหัสผ่านของบัญชี `postgres` คุณควรจะเห็นข้อความตามด้านล่าง

  ```
  You are now connected to database "reeba" as user "postgres".
  ```
  นี่หมายความว่าคุณเชื่อมต่อกับ database ได้เรียบร้อยแล้ว

  คุณสามารถดูความสัมพันธ์และตารางต่าง ๆ ได้ด้วยการพิมพ์คำสั่ง
  ```
  reeba=# \dt
  ```

- อัพเดตรายละเอียดภายใน database ด้วยคอมมานด์
  ```
  reeba=# \i database.sql
  ```
  ไม่รู้เหมือนกันว่าทำครั้งแรกมันหน้าตาเป็นยังไง แต่ถ้าคอมมานด์นี้รันผ่าน คิดว่าจะมีคำว่า `CREATE TABLE` เด้งออกมา

- สร้างไฟล์ชื่อ `.env.local` ในโฟลเดอร์ `backend`

  **ข้อควรระวัง: ไฟล์ `.env.local` จะเก็บรายละเอียดสำคัญส่วนตัว ที่ไม่สามารถเปิดเผยให้ผู้ใช้งานคนอื่น ๆ ได้รู้ได้ เช่นรหัสผ่านของบัญชี `postgres` ของคุณ และที่สำคัญ คือ JWT SECRET หากคีย์ลับนี้หลุดออกไป ผู้ใช้งานของเว็บไซต์เราจะถูกแฮคบัญชีไปทันที ดังนั้นขอให้ระวังมาก ๆ กับส่วนต่อไป**

  **ขอให้มั่นใจว่าไฟล์ `.env.local` มีสีเทา ๆ ใน Editor และขอให้มั่นใน (มั่นใจมากที่สุด) ว่าคุณไม่ได้ push ไฟล์นี้ขึ้นมายัง github.com โดยไม่ได้ตั้งใจ**

  **ห้ามใส่รายละเอียดด้านล่างนี้ในไฟล์ `.env` เนื่องจากไฟล์นี้จะถูก push ขึ้นมายัง remote**

  เมื่อไฟล์ถูกสร้างแล้ว คัดลอกรายละเอียดในไฟล์ `.env` ลงในไฟล์ `.env.local`

  เนื้อหาในไฟล์ `.env.local` จะเป็นแบบนี้
  ```
  FASTIFY_PORT='3000'
  JWT_SECRET=
  POSTGRES_USERNAME=
  POSTGRES_PASSWORD=
  POSTGRES_HOSTNAME='localhost'
  POSTGRES_PORT='5432'
  POSTGRES_DBNAME='reeba'
  ```

  เติมข้อที่ว่างไปทางด้านขวา หลังเครื่องหมายเท่ากับ ในไฟล์ `.env.local`
  - `JWT_SECRET`: โปรดอีเมลมาเอา
  - `POSTGRES_USERNAME`: ถ้าคุณล็อกอินเข้า database ด้วยคอมมานด์ `psql -U postgres` ช่องนี้ก็จะเป็น `postgres`
  - `POSTGRES_PASSWORD`: รหัสผ่านของบัญชี `postgres`

  ทุกฟิลด์หลังเครื่องหมายเท่ากับ จะต้องห่อไว้ด้วย singlequote มาถึงตรงนี้ คุณพร้อมสำหรับการพัฒนา ReebA API แล้ว

### ReebA.com
รันคอมมานด์นี้จากโฟลเดอร์แรกของโปรเจกต์
```
pnpm build:common && pnpm dev:frontend
```
เว็บไซต์จะเปิดขึ้นมาที่ `http://localhost:8080`

### ReebA API.
ขั้นตอนแรก จะต้องทำการเปิด PostgreSQL database server ก่อน

- เปิด terminal แยก (ที่ไม่ใช่ใน vscode) ในโฟลเดอร์ `backend` แล้วรันคอมมานด์
  ```
  psql -U postgres
  ```
  แล้วใส่รหัสผ่านของบัญชี `postgres`

- รันคอมมานด์
  ```
  postgres=# \c postgres://postgres@localhost:5432/reeba
  ```
  แล้วใส่รหัสผ่านของบัญชี `postgres`

  จะมีข้อความ
  ```
  You are now connected to database "reeba" as user "postgres".
  ```

  จากนั้นรัน
  ```
  reeba=# \i database.sql
  ```
  คุณพร้อม่ทำงานแล้ว

รันคอมมานด์เหล่านี้จากโฟลเดอร์แรกของโปรเจกต์
| Terminal #1              | Terminal #2             |
| -----------------------  | ----------------------  |
| `pnpm dev:common`        | `pnpm dev:backend`      |

คุณจะสามารถคุยกับ API ได้ที่ `http://localhost:3000`.

### พัฒนาทั้ง Frontend และ Backend พร้อมกัน
ขั้นตอนแรก จะต้องทำการเปิด PostgreSQL database server ก่อน

- เปิด terminal แยก (ที่ไม่ใช่ใน vscode) ในโฟลเดอร์ `backend` แล้วรันคอมมานด์
  ```
  psql -U postgres
  ```
  แล้วใส่รหัสผ่านของบัญชี `postgres`

- รันคอมมานด์
  ```
  postgres=# \c postgres://postgres@localhost:5432/reeba
  ```
  แล้วใส่รหัสผ่านของบัญชี `postgres`

  จะมีข้อความ
  ```
  You are now connected to database "reeba" as user "postgres".
  ```

  จากนั้นรัน
  ```
  reeba=# \i database.sql
  ```
  คุณพร้อม่ทำงานแล้ว

เปิดเทอร์มินอล 3 เทอร์มินอล แล้วรันคอมมานด์เหล่านี้จากโฟลเดอร์แรกของโปรเจกต์
| Terminal #1              | Terminal #2             | Terminal #3            |
| -----------------------  | ----------------------  | ---------------------  |
| `pnpm dev:common`        | `pnpm dev:frontend`     | `pnpm dev:backend` |

คุณจะเห็น API ทำงานที่ `http://localhost:3000` และเว็บไซต์ทำงานที่ `http://localhost:8080`

## ทดสอบ
โมดูล `common` และ `backend` ของเราจะถูกทดสอบโดย [`tap`](https://github.com/tapjs/node-tap) และนี่คือวิธีการรันเทสต์

- ทำการ Build `common` โดยรัน
  ```
  pnpm build:common
  ```
  จากรูทของโปรเจกต์

- จากนั้นรัน
  ```
  pnpm test
  ```
  เพื่อดูผลลัพธ์

**ทุก test ต้องผ่านก่อนทำการส่ง PR**

## การ seed database
ที่ ReebA จะมีคอมมานด์ชื่อว่า `seed` และ `inject` ที่คุณสามารถใช้เพื่อ seed database เพื่อใช้ในการทดลองได้

- `pnpm seed` จะทำการ generate ช้อมูลผ่าน seed (112233) เพื่อที่ข้อมูลทุกครั้งจะเหมือนกัน
- `pnpm inject` จะทำการใส่ข้อมูลที่สร้างมาเข้าไปใน database (คอมมานด์นี้ยังไม่สมบูรณ์ 100% และอาจมีการเปลี่ยนแปลง)

กรุณาเข้าใจว่า `pnpm inject` จะสามารถทำงานได้ก็ต่อเมื่อ backend server ถูกเปิดอยู่ คุณจะต้องรัน `pnpm dev:backend` ก่อนจาก terminal หนึ่ง แล้วใช้อีก terminal หนึ่งเพื่อทำการรัน `pnpm inject` ความยากในการใช้คอมมานด์นี้ถูก noted ไว้แล้ว และจะถูกแก้ไขในอนาคต
