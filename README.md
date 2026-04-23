# 🎸 OnFret Marketplace — Hangszer Piactér

Az **OnFret Marketplace** egy full-stack webalkalmazás, amely hangszerek és zenei eszközök online adás-vételét teszi lehetővé.
A projekt modern webfejlesztési elvek mentén készült: tiszta architektúra, JWT-alapú autentikáció és teljes körű CRUD funkcionalitás.

---

## 📖 Tartalomjegyzék

* 🌟 Funkciók
* 🏗️ Technológiai Stack
* 💻 Telepítés és Futtatás
* 📊 Adatbázis Séma
* 🧪 Minőségbiztosítás
* 🛣️ API Dokumentáció
* 📈 Továbbfejlesztési tervek

---

## 🌟 Funkciók

### 🔐 Biztonság és Felhasználók

* JWT alapú autentikáció (biztonságos token kezelés)
* Felhasználói profil rendszer
* Korábbi rendelések nyomon követése
* Termékértékelési rendszer (csillagos)

### 🔍 Intelligens Keresés és Szűrés

* Backend oldali szűrés:

  * név
  * ár intervallum
  * kategória
  * márka
* Gyors lekérdezések optimalizált API-val
* Dinamikus, reszponzív UI

### 🛒 E-commerce Logika

* Perzisztens kosár (LocalStorage + backend szinkron)
* Rendeléskezelés
* Automatikus készletfrissítés

### 🛠️ Admin Felület

* Felhasználók kezelése
* Termékek és kategóriák kezelése
* Teljes admin kontroll

---

## 🏗️ Technológiai Stack

### Frontend

* **React 18** – komponens alapú UI
* **Context API** – globális állapotkezelés
* **React Bootstrap** – reszponzív design
* **Material UI (MUI)** – speciális UI elemek

### Backend

* **NestJS** – skálázható Node.js framework
* **Prisma ORM** – típusbiztos adatkezelés
* **MySQL** – relációs adatbázis
* **Jest** – tesztelés

---

## 💻 Telepítés és Futtatás

### 1. Előfeltételek

* Node.js (v18+)
* MySQL Server (v8+)

---

### 2. Backend (Server)

```bash
cd server
npm install
```

.env fájl létrehozása:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/onfret"
JWT_SECRET="your_secret_key"
```

Adatbázis migráció és indítás:

```bash
npx prisma migrate dev
npm run start:dev
```

---

### 3. Frontend (Client)

```bash
cd client
npm install
npm start
```

---

## 📊 Adatbázis Séma (Vázlat)

Fő entitások:

* **Vevő (User)** – hitelesítés és profil adatok
* **Termék (Product)** – ár, leírás, márka
* **Kategória (Category)** – hierarchikus struktúra
* **KosárTétel (CartItem)** – ideiglenes tárolás
* **Rendelés (Order)** – végleges tranzakció
* **RendelésTétel (OrderItem)** – rendelés részletek

---

## 🧪 Minőségbiztosítás

### Tesztek futtatása

**Unit tesztek:**

```bash
npm run test
```

**E2E tesztek:**

```bash
npm run test:e2e
```

---

## 🛣️ API Dokumentáció

### Termékek szűrése

```
GET /termek?search={név}&minPrice={min}&maxPrice={max}&category={id}&brand={márka}
```

| Paraméter | Típus  | Kötelező | Leírás                        |
| --------- | ------ | -------- | ----------------------------- |
| search    | string | Nem      | Keresés névben vagy leírásban |
| minPrice  | number | Nem      | Minimum ár                    |
| maxPrice  | number | Nem      | Maximum ár                    |
| category  | number | Nem      | Kategória azonosító           |
| brand     | string | Nem      | Márka szűrés                  |

---

## 📈 Továbbfejlesztési tervek

* [ ] Stripe / Barion fizetés integráció
* [ ] Képfeltöltés (AWS S3 / Cloudinary)
* [ ] Email értesítések (pl. rendelés után)

---

## 👨‍💻 Készítette

**Patrik Sarandi**
Vizsgaremek projekt — 2026
