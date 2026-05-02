# 🎸 OnFret Marketplace - Vizsgaremek 2026

![Node.js](https://img.shields.io/badge/Node.js-LTS-green?style=for-the-badge&logo=node.js)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

Az **OnFret Marketplace** egy modern, full-stack e-kereskedelmi platform, amelyet kifejezetten hangszerek és zenei kiegészítők online adásvételére fejlesztettünk ki. A projekt célja egy skálázható, biztonságos és reszponzív webalkalmazás megvalósítása a legfrissebb iparági technológiák alkalmazásával.

---

## 👥 Szerzők
- **Sárándi Patrik**
- **Kökény Bálint**
- **Pacskó Dániel László**

---

## 📌 Projekt áttekintés
Az alkalmazás lehetővé teszi a felhasználók számára termékek böngészését, szűrését és megvásárlását, miközben teljes körű adminisztrációs felületet biztosít a készlet és a felhasználók kezeléséhez.

### Fő jellemzők:
*   **Tiszta architektúra:** Moduláris NestJS felépítés a könnyű karbantarthatóság érdekében.
*   **Biztonság:** JWT-alapú hitelesítés és szerepkör alapú hozzáférés-szabályozás (RBAC).
*   **ACID Tranzakciók:** Biztonságos rendelésleadás és készletkezelés Prisma tranzakciókkal.
*   **Soft Delete:** Logikai törlés a termékeknél és kategóriáknál az adatintegritás megőrzése végett.
*   **Modern UI:** Teljesen reszponzív felület React Bootstrap és Material UI segítségével.

---

## 🛠️ Technológiai Stack

### Frontend
- **React 18** – Komponens alapú felhasználói felület.
- **Context API** – Globális állapotkezelés (User session, Kosár).
- **React Bootstrap & Material UI** – Modern és reszponzív megjelenés.
- **Axios** – API hívások kezelése.

### Backend
- **NestJS** – Skálázható, TypeScript alapú Node.js keretrendszer.
- **Prisma ORM** – Típusbiztos adatkezelés és adatbázis-migráció.
- **MySQL** – Relációs adatbázis-kezelő.
- **Passport.js & JWT** – Biztonságos autentikáció.

---

## 🗄️ Adatbázis séma
A rendszer relációs adatbázist használ, normalizált struktúrával.

**Fő entitások:**
*   **User:** Felhasználói adatok, titkosított jelszavak (bcrypt) és jogosultságok.
*   **Product:** Termékek ára, készlete és leírása (logikai törlés támogatással).
*   **Category:** Hierarchikus kategóriarendszer.
*   **FizetesiKosar & KosarTetel:** Felhasználóhoz kötött perzisztens kosárkezelés.
*   **Order & RendeltTermek:** Véglegesített rendelések tranzakciós története.

---

## 🚀 Telepítés és Futtatás

### Előfeltételek
- **Node.js** (v18 vagy újabb)
- **MySQL** szerver

### 1. Szerver (Backend) beállítása
```bash
cd backend
npm install
Hozd létre a .env fájlt a backend gyökerében:KódrészletDATABASE_URL="mysql://USER:PASSWORD@localhost:3306/onfret_db"
JWT_SECRET="valami-nagyon-titkos-kulcs"
Adatbázis szinkronizálása és szerver indítása:Bashnpx prisma migrate dev
npm run start:dev
2. Kliens (Frontend) beállításaBashcd frontend
npm install
npm start
🔌 API Dokumentáció (Példák)Termékek listázása és szűréseGET /termek?search={név}&minPrice={min}&maxPrice={max}&category={id}ParaméterTípusLeírássearchstringKeresés név vagy márka alapjánminPricenumberMinimum ár szűréscategoryIdnumberKategória azonosítóKosár és RendelésPOST /rendeles/kosartetel - Termék kosárba helyezése (Auth szükséges)POST /rendeles/veglegesit - Rendelés leadása és készlet levonása🛡️ LicencA projekt a Vizsgaremek 2026 keretében készült. Minden jog fenntartva.
