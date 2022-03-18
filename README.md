# Online Thai Video Content Search System 

### คู่มือในการติดตั้งระบบ

1. Clone repository

ใช้คำสั่ง `git clone https://github.com/jnnnn1999/Online-Thai-Video-Content-Search-System.git`

---
2. ติดตั้ง Cloud Service, ดาวน์โหลด Client JSON file และGoogle Cloud Speech-to-Text

สามารถดูวิธีการติดตั้งได้จากลิงก์ต่อไปนี้
https://docs.google.com/document/d/15lbDj62Nbf6ZUfGMaVZXY0ughW3Baca5G52gZcRtxrY/edit?usp=sharing

---
3. ติดตั้ง ส่วน Backend

```virtualenv venv
.\venv\Scripts\activate
docker-compose -f local.yml build
docker-compose -f local.yml run --rm django python manage.py createsuperuser
docker-compose -f local.yml up
```
หน้าเว็บของส่วนหลังบ้าน คือ http://127.0.0.1:8000

---

4. ติดตั้ง ส่วน frontend

```cd frontend 
npm i
npm start
```
หน้าเว็บของส่วนหน้าบ้าน คือ http://localhost:3000

---


