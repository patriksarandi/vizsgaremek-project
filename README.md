<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="110" alt="NestJS Logo" />
</p>

<p align="center">
  🎸 <strong>OnFret Marketplace – Vizsgaremek 2026</strong><br/>
  Full-stack webshop alkalmazás hangszerek és zenei kiegészítők online értékesítésére
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Backend-NestJS-red?style=for-the-badge&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/Database-MySQL-orange?style=for-the-badge&logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Auth-JWT-green?style=for-the-badge" alt="JWT" />
</p>

---

## 📌 Projekt leírás

Az **OnFret Marketplace** egy modern, full-stack webalkalmazás, amely hangszerek és zenei kiegészítők online értékesítésére készült.

A projekt célja egy olyan webshop rendszer megvalósítása volt, amelyben a felhasználók egyszerűen tudnak:

- regisztrálni,
- bejelentkezni,
- termékeket böngészni,
- termékeket kosárba helyezni,
- rendelést leadni,
- saját profiladataikat kezelni.

Az alkalmazás adminisztrációs felületet is tartalmaz, ahol az adminisztrátorok kezelni tudják a termékeket, készletet, rendeléseket és egyéb rendszeradatokat.

---

## 👥 Készítők

- **Sárándi Patrik**
- **Kökény Bálint**
- **Pacskó Dániel László**

---

## 🎯 A projekt célja

A vizsgaremek célja egy olyan valósághoz közeli e-kereskedelmi rendszer létrehozása volt, amely bemutatja a full-stack fejlesztés főbb területeit:

- frontend fejlesztés,
- backend API fejlesztés,
- adatbázis-kezelés,
- autentikáció,
- jogosultságkezelés,
- kosár- és rendeléslogika,
- admin felület,
- tesztelés,
- dokumentáció.

---

## 🧩 Fő funkciók

### Felhasználói funkciók

- Regisztráció
- Bejelentkezés
- JWT alapú autentikáció
- Termékek böngészése
- Termékek megtekintése részletes oldalon
- Kosárkezelés
- Termékmennyiség módosítása a kosárban
- Rendelés leadása
- Profiladatok módosítása
- Név módosítása
- E-mail cím módosítása
- Telefonszám módosítása
- Számlázási cím módosítása
- Saját rendelések megtekintése
- Fiók felfüggesztése / törlési folyamat kezelése

### Admin funkciók

- Admin kezelőfelület
- Termékek listázása
- Termék hozzáadása
- Termék módosítása
- Termék törlése
- Készlet módosítása
- Kategóriák kezelése
- Felhasználók kezelése
- Rendelések megtekintése
- Rendelési státusz módosítása

---

## 🏗️ Projekt struktúra

```txt
vizsgaremek-project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Újrahasznosítható komponensek
│   │   ├── context/        # Auth és kosár context
│   │   ├── lib/            # API konfiguráció
│   │   └── pages/          # Oldalak
│   └── package.json
│
├── server/                 # NestJS backend
│   ├── prisma/             # Prisma schema és migrációk
│   ├── src/
│   │   ├── auth/           # Autentikáció
│   │   ├── termek/         # Termék modul
│   │   ├── kategoria/      # Kategória modul
│   │   ├── rendeles/       # Rendelés modul
│   │   ├── vevo/           # Vevő modul
│   │   └── ertekeles/      # Értékelés modul
│   └── package.json
│
└── README.md
```

---

## 🛠️ Technológiai stack

### Frontend

- **React** – komponens alapú frontend fejlesztés
- **TypeScript** – típusbiztonság
- **React Router** – oldalnavigáció
- **React Bootstrap** – reszponzív UI komponensek
- **Context API** – globális állapotkezelés
- **Fetch API / Axios** – backend kommunikáció

### Backend

- **NestJS** – moduláris backend keretrendszer
- **TypeScript** – típusbiztos backend fejlesztés
- **Prisma ORM** – adatbázis-kezelés
- **MySQL** – relációs adatbázis
- **JWT** – token alapú autentikáció
- **bcrypt** – jelszó titkosítás
- **Passport.js** – autentikációs stratégia

### Fejlesztői eszközök

- Git
- GitHub
- npm
- Prisma CLI
- Visual Studio Code

---

## 🗄️ Adatbázis

A projekt MySQL relációs adatbázist használ Prisma ORM-mel.

### Főbb entitások

- **Vevo** – felhasználói adatok
- **Termek** – termékek
- **Kategoria** – termékkategóriák
- **FizetesiKosar** – felhasználói kosár
- **KosarTetel** – kosárban lévő termékek
- **Rendeles** – rendelési adatok
- **RendeltTermek** – rendeléshez tartozó termékek
- **Ertekeles** – termékértékelések

### Kapcsolatok

- Egy vevőhöz több rendelés tartozhat.
- Egy rendelés több rendelt terméket tartalmazhat.
- Egy termék egy kategóriához tartozik.
- Egy kosár több kosártételt tartalmazhat.
- Egy vevő több értékelést is írhat.

---

## 🔐 Autentikáció és jogosultságkezelés

A rendszer JWT alapú autentikációt használ.

Bejelentkezés után a backend egy tokent küld vissza, amelyet a frontend eltárol, majd a védett API hívásoknál elküld.

Példa header:

```txt
Authorization: Bearer <token>
```

### Szerepkörök

A rendszerben két fő szerepkör található:

- **USER** – normál felhasználó
- **ADMIN** – adminisztrátor

Az adminisztrációs felület csak admin jogosultsággal érhető el.

---

## 🛒 Kosár és rendelés működése

A felhasználó a termékeket kosárba tudja helyezni.  
A kosárban módosítható a termékek mennyisége, illetve a termékek eltávolíthatók.

A rendelés leadásának feltételei:

1. a felhasználó legyen bejelentkezve,
2. a kosár ne legyen üres,
3. a profilban legyen kitöltve a számlázási cím.

Ha a számlázási cím nincs megadva, a rendszer nem engedi leadni a rendelést, és a felhasználót a profil oldalra irányítja.

---

## 🧑‍💼 Admin kezelőfelület

Az admin felületen keresztül az adminisztrátor kezelheti a webshop működéséhez szükséges adatokat.

### Admin oldalak

- Termékek kezelése
- Kategóriák kezelése
- Felhasználók kezelése
- Megrendelések kezelése

### Rendelés státuszok

A rendelések státusza módosítható:

- Függőben
- Teljesítve
- Törölve

---

## 🔄 API végpontok

### Auth

```txt
POST /auth/signup
POST /auth/signin
```

### Termékek

```txt
GET    /termek
GET    /termek/:id
POST   /termek
PUT    /termek/:id
DELETE /termek/:id
```

### Kategóriák

```txt
GET    /kategoria
POST   /kategoria
PATCH  /kategoria/:id
DELETE /kategoria/:id
```

### Vevők

```txt
GET    /vevo
PATCH  /vevo/:id/teljes-nev
PATCH  /vevo/:id/telefonszam
PATCH  /vevo/:id/email
PATCH  /vevo/:id/cim
DELETE /vevo/:id
```

### Rendelések

```txt
GET   /rendeles
GET   /rendeles/admin
POST  /rendeles
PATCH /rendeles/:id
```

### Értékelések

```txt
GET  /ertekeles
POST /ertekeles
```

---

## ⚙️ Telepítés és futtatás

### Előfeltételek

A projekt futtatásához szükséges:

- Node.js 18 vagy újabb
- MySQL szerver
- npm
- Git

---

## Backend telepítés

Lépj be a backend mappába:

```bash
cd server
```

Függőségek telepítése:

```bash
npm install
```

Hozz létre egy `.env` fájlt a `server` mappában:

```env
DATABASE_URL="mysql://felhasznalo:jelszo@localhost:3306/onfret_db"
JWT_SECRET="egy-hosszu-egyedi-titkos-kulcs"
JWT_EXPIRES_IN="1d"
PORT=7777
```

Prisma kliens generálása:

```bash
npx prisma generate
```

Adatbázis migráció futtatása:

```bash
npx prisma migrate dev
```

Backend indítása fejlesztői módban:

```bash
npm run start:dev
```

A backend alapértelmezett címe:

```txt
http://localhost:7777
```

---

## Frontend telepítés

Lépj be a frontend mappába:

```bash
cd client
```

Függőségek telepítése:

```bash
npm install
```

Frontend indítása:

```bash
npm run dev
```

A frontend alapértelmezett címe:

```txt
http://localhost:5173
```

---

## 🧪 Tesztelés

A backend tesztek futtatása:

```bash
cd server
npm run test
```

A projektben unit tesztek találhatók több service és controller réteghez.

Tesztelt területek például:

- AuthService
- AuthController
- JwtStrategy
- TermekService
- TermekController
- KategoriaService
- KategoriaController
- RendelesService
- RendelesController
- ErtekelesService
- ErtekelesController

A tesztek célja annak ellenőrzése, hogy az egyes service-ek és controller-ek a várt módon működnek.

---

## 📁 Környezeti változók

A backend futtatásához szükséges `.env` fájl:

```env
DATABASE_URL="mysql://felhasznalo:jelszo@localhost:3306/onfret_db"
JWT_SECRET="egy-hosszu-egyedi-titkos-kulcs"
JWT_EXPIRES_IN="1d"
PORT=7777
```

Biztonsági okokból a `.env` fájlt nem ajánlott publikus GitHub repóba feltölteni.

Ajánlott `.env.example` fájl:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1d"
PORT=7777
```

---

## 📦 Git használat

A projekt verziókezelése Git segítségével történt.

Ajánlott `.gitignore` tartalom:

```gitignore
node_modules/
dist/
.env
*.log
.DS_Store
.vscode/
```

A következő fájlokat és mappákat nem érdemes verziókezelni:

- `node_modules/`
- `dist/`
- `.env`
- log fájlok

---

## ⚠️ Ismert korlátok

A projekt jelenlegi állapotában működőképes, azonban vannak továbbfejleszthető területek:

- nincs online fizetési rendszer,
- nincs automatikus e-mail értesítés,
- nincs teljes frontend tesztlefedettség,
- nincs automatikus számlagenerálás,
- nincs külön szállítási modul,
- nincs CI/CD pipeline,
- nincs Docker alapú futtatási környezet,
- a mobil optimalizáció tovább javítható.

---

## 🚀 Továbbfejlesztési lehetőségek

### Fizetési rendszer

A rendszer továbbfejleszthető online fizetési integrációval.

Lehetséges megoldások:

- Stripe
- PayPal
- Barion

Ez lehetővé tenné a valós idejű fizetést és a fizetési státuszok kezelését.

---

### E-mail értesítések

A rendelési folyamat kiegészíthető automatikus e-mail küldéssel.

Példák:

- regisztráció visszaigazolása,
- rendelés visszaigazolása,
- státuszváltozás értesítés,
- jelszó-visszaállítás.

---

### Admin dashboard fejlesztése

Az admin felület tovább bővíthető statisztikai dashboarddal.

Lehetséges funkciók:

- napi rendelések száma,
- havi bevétel,
- legnépszerűbb termékek,
- alacsony készletű termékek,
- aktív felhasználók száma.

---

### Keresés és szűrés fejlesztése

A termékkereső továbbfejleszthető összetettebb szűrésekkel.

Példák:

- ár szerinti rendezés,
- kategória szerinti szűrés,
- márka szerinti szűrés,
- készleten lévő termékek szűrése,
- full-text search.

---

### Biztonság fejlesztése

A rendszer biztonsága tovább növelhető.

Lehetséges fejlesztések:

- refresh token használata,
- rate limiting,
- jelszó-erősség ellenőrzés,
- admin műveletek naplózása,
- szigorúbb input validáció.

---

### Frontend tesztelés

A frontend bővíthető unit és integration tesztekkel.

Lehetséges eszközök:

- Vitest
- React Testing Library
- Cypress
- Playwright

---

### Deployment

A projekt később éles környezetbe is telepíthető.

Lehetséges megoldások:

- frontend: Vercel vagy Netlify,
- backend: Render, Railway vagy VPS,
- adatbázis: Railway MySQL, PlanetScale vagy saját MySQL szerver.

---


## 🧠 Fejlesztői megjegyzés

A projekt célja egy valósághoz közeli webshop rendszer megvalósítása volt.  
A fejlesztés során fontos szempont volt a backend és frontend rétegek elkülönítése, a biztonságos autentikáció, valamint az adminisztrációs funkciók biztosítása.

A rendszer jelenlegi állapotában alkalmas a fő webshop folyamatok bemutatására:

1. regisztráció,
2. bejelentkezés,
3. termék böngészés,
4. kosárba helyezés,
5. rendelés leadás,
6. admin oldali rendeléskezelés.

---

## 🛡️ Licenc

A projekt a **Vizsgaremek 2026** keretében készült.  
Minden jog fenntartva.
