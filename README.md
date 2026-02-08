#  Queue Management System 
ระบบจัดการคิวที่พัฒนาด้วย .NET 10 และ Angular

Tech Stack ที่ใช้
โปรเจกต์นี้ถูกออกแบบมาให้รองรับการทำงานแบบแยกส่วน ดังนี้:

1. Database (SQL Server)
* ออกแบบโครงสร้าง Table สำหรับระบบคิว
* ใช้ Stored Procedures ในการจัดการ logic การ Insert และ Update ข้อมูล เพื่อความปลอดภัยและรวดเร็ว
  
2. BackEnd (.NET 10 Web API)
* พัฒนาด้วย .NET 10

3. FrontEnd (Angular)
* พัฒนาด้วย Angular
* ใช้ Angular Material สำหรับ UI

---
 Project Structure:
* `/1-DataBase`: สคริปต์ SQL สำหรับสร้างฐานข้อมูลและ Stored Procedures
* `/2-BackEnd`:  API
* `/3-FrontEnd`: เว็บแอปพลิเคชัน
---
วิธีการรันโปรเจกต์ (Getting Started)
1. รันไฟล์ SQL ในโฟลเดอร์ `1-DataBase` เพื่อสร้างฐานข้อมูล
2. เปิดโซลูชันในโฟลเดอร์ `2-BackEnd` และรัน API
3. เข้าไปที่ `3-FrontEnd` แล้วรันคำสั่ง `npm install` ตามด้วย `ng serve`
