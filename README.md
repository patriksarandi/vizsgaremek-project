# 🎸 OnFret Marketplace

Egy teljes stack webalkalmazás hangszer és zenei eszközök online piacteréhez.
A projekt célja egy modern, skálázható webshop rendszer megvalósítása backend szűréssel, felhasználókezeléssel és admin felülettel.

---

## 🚀 Funkciók

### 👤 Felhasználók

* Regisztráció / Bejelentkezés (JWT alapú autentikáció)
* Profil kezelés
* Termékek értékelése

### 🛍 Termékek

* Termékek listázása kategóriák szerint
* **Komplex szűrés (backend oldalon):**

  * név szerinti keresés
  * kategória
  * ár intervallum
  * márka
* Rendezés (ár szerint)

### 🛒 Kosár és rendelés

* Kosár kezelés (termék hozzáadás, mennyiség módosítás)
* Rendelés leadás
* Korábbi rendelések megtekintése

### 🛠 Admin felület

* Felhasználók kezelése
* Kategóriák kezelése
* Termékek kezelése

---

## 🧠 Technológiák

### Backend

* NestJS
* Prisma ORM
* MySQL
* JWT autentikáció

### Frontend

* React
* React Router
* React Bootstrap
* Context API (Auth, Kosár)

---

## ⚙️ Telepítés

### 1. Repository klónozása

```bash
git clone https://github.com/patriksarandi/vizsgaremek-project.git
cd vizsgaremek-project
```

---

### 2. Backend indítása

```bash
cd server
npm install
```

#### .env fájl létrehozása:

```env
DATABASE_URL="mysql://user:password@localhost:3306/adatbazis"
JWT_SECRET="titkoskulcs"
```

#### Adatbázis migráció:

```bash
npx prisma migrate dev
```

#### Backend indítása:

```bash
npm run start:dev
```

---

### 3. Frontend indítása

```bash
cd client
npm install
npm start
```

---

## 🔎 API használat (példa)

### Termékek lekérdezése szűréssel

```http
GET /termek?search=fender&minPrice=10000&maxPrice=500000&category=1&brand=Fender
```

### Paraméterek

| Paraméter | Leírás              |
| --------- | ------------------- |
| search    | keresés név alapján |
| category  | kategória ID        |
| minPrice  | minimum ár          |
| maxPrice  | maximum ár          |
| brand     | márka               |
| page      | oldalszám           |
| limit     | elemszám            |

---

## 🧪 Tesztelés

Az API tesztelése Thunder Client segítségével történt.

### Példa kérés:

```http
GET /termek?search=laptop&minPrice=100000
```

---

## 🎯 Architektúra

A backend réteges felépítésű:

* Controller → HTTP kezelés
* Service → üzleti logika
* Prisma → adatbázis műveletek

A frontend komponens alapú és Context API-t használ globális állapotkezelésre.

---

## 💡 UX megoldások

* Dinamikus keresés `onChange` eseménnyel
* Debounce használata az API hívások optimalizálására
* Reszponzív design (mobil támogatás Offcanvas segítségével)
* Kosár dropdown gyors eléréssel

---

## 📌 Továbbfejlesztési lehetőségek

* Unit tesztek bővítése
* Pagination UI
* Többszörös kategória szűrés backend oldalon
* Kép feltöltés optimalizálása

---

## 👨‍💻 Készítette

Patrik Sarandi
Vizsgaremek projekt

---
