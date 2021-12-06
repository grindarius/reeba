# ReebA Contributing Guide.
ที่ ReebA มีวิธีการพัฒนาแอพพลิเคชั่นให้เป็นลำดับ เพื่อที่จะได้มีการทำงานที่เป็นแบบแผน โดยที่การทำงานจะเริ่มจาก

1. สร้าง Issue
2. เลือก Issue ที่จะทำ
3. สร้าง Branch เพื่อทำงานในเครื่องของเรา
4. Commit Code และ Push ขึ้น Github
5. สร้าง Pull Request
6. ทำการรวมกิ่ง และลบ Branch ออกจากในเครื่อง

### สร้าง Issue

ไปที่หน้า `Issue` ของ `reeba` แล้วกดที่ `New issue`
![Screenshot 2021-12-06 172637](https://user-images.githubusercontent.com/60266519/144859438-35557835-fb9b-4c65-a9fe-ec3ed6c40fdb.jpg)

เขียนอธิบายว่าปัญหาคืออะไร
![Screenshot 2021-12-06 172706](https://user-images.githubusercontent.com/60266519/144859494-db68116d-ba65-48cf-869b-d8ca5b106ddb.jpg)

ทางด้านขวา กดที่ `Projects` แล้วเลือก `ReebA's Backlog` ที่เหลือยังไม่ต้องเลือกอะไร
![Screenshot 2021-12-06 172720](https://user-images.githubusercontent.com/60266519/144859582-77dbd9cc-5eb4-4a55-aa9a-89d5d3c09c12.jpg)

เมื่อพิมพ์เสร็จแล้ว กดที่ `Create new issue` เราจะถูกพามาหน้านี้ หมายความว่าเราทำถูกแล้ว
![Screenshot 2021-12-06 172738](https://user-images.githubusercontent.com/60266519/144859950-ead8ec2a-f8bf-4ffc-ac4d-7d7dd6335287.jpg)

### เลือก Issue ที่จะทำ

ให้เราเข้าไปที่ `Projects` ของ `ReebA` แล้วเราจะเห็นว่าเรามีงานไหนที่จะต้องทำบ้าง (อยู่ในช่อง `Todo`) เมื่อเราต้องการจะทำงานไหน เราจะต้องทำให้งานเป็นของเราก่อน ด้วยการกดไปที่งานที่เราต้องการทำ
![Screenshot 2021-12-06 172950](https://user-images.githubusercontent.com/60266519/144860293-6819815d-753c-46fd-983b-1c3e6f5adf6f.jpg)

จะมีหน้าต่างเด้งขึ้นมาทางขวา ตรงคำว่า `Assignee` เลือกชื่อของเรา เพราะ `Assignee` แปลว่า คนที่จะทำงาน
![Screenshot 2021-12-06 173350](https://user-images.githubusercontent.com/60266519/144860955-ab013610-42fb-42ca-a348-6d5615fd6ec4.jpg)

เมื่อเลือกเป็นชื่อเราแล้ว ก็*อย่าลืม* ย้าย Card งานไปไว้ที่ช่อง `In progress` ด้วยนะ
![Screenshot 2021-12-06 173407](https://user-images.githubusercontent.com/60266519/144861075-04c9cd88-9f37-4f91-bcf5-11b7360651d2.jpg)

### สร้าง Branch เพื่อทำงานในเครื่องของเรา

เปิด Github Desktop แล้วตรวจสอบว่าเราอยู่ถูก Repository และอยู่ที่ main
![image](https://user-images.githubusercontent.com/60266519/144870139-8cf5f6b4-8f9d-4878-832d-951ec8ca8daa.png)

เลือกที่ `Branch` ต่อด้วย `New branch`

![Screenshot 2021-12-06 173431](https://user-images.githubusercontent.com/60266519/144871115-f63fd48d-d5a2-4bab-aa95-1563929d9233.jpg)

พิมพ์ชื่อของ Branch โดยที่ชื่อจะต้องเป็น `kebab-case` เท่านั้น (คั่นด้วย `-` ไม่มี spacebar)  ภาษาอังกฤษเท่านั้น แล้วกด `Create Branch`
![Screenshot 2021-12-06 173440](https://user-images.githubusercontent.com/60266519/144872249-5e0dd8dc-ca23-45e7-9d5b-63fbd6efd777.jpg)

Branch ที่ถูกสร้างขึ้น จะอยู่บนเครื่องของเราเท่านั้น เราจะต้องกด Publish Branch เพื่ออัพโหลด Branch ของเราขึ้นมาบนเว็บ Github.com
![Screenshot 2021-12-06 173457](https://user-images.githubusercontent.com/60266519/144876822-af325196-ed3a-4408-b222-9417df1665fe.jpg)

จากนั้นเราก็จะสามารถทำงานบนเครื่องของเราได้เลย

### Commit Code และ Push ขึ้น Github
เมื่อเราเริ่มทำงาน เราจะต้องทำการ Commit ที่มีหน้าที่เหมือนกับจุด Checkpoint ในการเล่นเกม โดยใน 1 PR ควรมี Commit เยอะ ๆ ถี่ ๆ ที่มีขนาดเล็ก ๆ จะทำให้ Review ได้ง่าย และชื่อของ Commit ควรมีความหมาย เพื่อที่ทุกคนจะได้เข้าใจว่าเราจะทำอะไร

หากเราต้องการจะ Commit ให้เรามาที่ Github Desktop เราจะเห็นการเปลี่ยนแปลงต่าง ๆ ของ Code ทางด้านขวา

อธิบายตามหมายเลข
1. รายการไฟล์ที่มีการเปลี่ยนแปลง เมื่อกดดูจะสามารถดูได้ว่าเราลบอะไรออกไป และเพิ่มอะไรเข้ามา
2. Commit Header เขียนเพื่ออธิบายว่าในการที่เราจะ Commit ในครั้งนี้ เราทำอะไรลงไป 
3. Commit Description อธิบายเพิ่มเติมว่าทำอะไรลงไปอีก ปกติไม่เขียนกัน
4. ปุ่ม Commit

เติมรายละเอียดของ 3 ข้อแรกให้ชัดเจน เลือกเฉพาะไฟล์ที่มีการเกี่ยวข้องในการเปลี่ยนแปลงนั้น ๆ เมื่อลงตัวแล้ว กดปุ่ม 4
![Screenshot 2021-12-06 173618](https://user-images.githubusercontent.com/60266519/144883920-7dac401a-9afc-4d52-ba70-2abe0cf45447.jpg)

เมื่อกด Commit แล้ว จะพาเรามายังหน้านี้ เราสามารถกด Push เพื่อดัน Code ของเราขึ้นไปบน github.com แต่ว่า ถ้าเกิดว่าเราไม่อยากจะดัน Commit เดียวนี้ขึ้นไป เราสามารถ Commit เก็บไว้เยอะ ๆ แล้วค่อย ๆ Push ขึ้น github.com ครั้งเดียวพร้อมกันได้ (ใม่ควรทำ)
![Screenshot 2021-12-06 173644](https://user-images.githubusercontent.com/60266519/144886392-eb22566d-1709-4e78-916b-7e48285a8116.jpg)

เมื่อเราพร้อมสำหรับการ PR (งานเสร็จแล้ว) กดที่ปุ่ม `Create Pull Request` เพื่อขอคำอนุญาตในการ merge งานเข้าสายหลัก
![Screenshot 2021-12-06 173511](https://user-images.githubusercontent.com/60266519/144887210-e8bcbc29-7dfc-4b06-bce4-6609fb6da53c.jpg)

คุณจะถูกพามาที่นี่ เพื่อเขียนคำอธิบายเกี่ยวกับงานที่ได้ทำ โดยที่จะมี Pattern ให้เติมอยู่แล้ว
ด้านขวา
- เลือกคนตรวจงาน (Reviewer) 1 ถึง 2 คน
- เลือกชื่อคนทำงาน (Assignee) ชื่อเราเอง หากทำมากกว่า 1 คนก็เลือกเพื่อนด้วย
- 
![Screenshot 2021-12-06 173724](https://user-images.githubusercontent.com/60266519/144887942-2aff66ac-6df8-4083-b44c-2c32c1d13afa.jpg)

