# 🎸 OnFret Marketplace - Vizsgaremek 2026

Az **OnFret Marketplace** egy modern, full-stack e-kereskedelmi platform, amelyet kifejezetten hangszerek és zenei kiegészítők online adásvételére fejlesztettünk ki. A projekt célja egy skálázható, biztonságos és reszponzív webalkalmazás megvalósítása a legfrissebb iparági technológiák alkalmazásával.

## 👥 Szerzők
- **Sárándi Patrik**
- **Kökény Bálint**
- **Pacskó Dániel László**

---

## 📌 Projekt áttekintés
Az alkalmazás lehetővé teszi a felhasználók számára termékek böngészését, szűrését és megvásárlását, miközben teljes körű adminisztrációs felületet biztosít a készlet és a felhasználók kezeléséhez.

### Fő jellemzők:
* **Tiszta architektúra:** Moduláris felépítés a könnyű karbantarthatóság érdekében.
* **Biztonság:** JWT-alapú hitelesítés és szerepkör alapú hozzáférés-szabályozás (RBAC).
* **Interaktivitás:** Valós idejű kosárkezelés és dinamikus keresőmotor.
* **Modern UI:** Teljesen reszponzív felület React Bootstrap és Material UI segítségével.

---

## 🛠️ Technológiai Stack

### Frontend
- **React 18** – Komponens alapú felhasználói felület.
- **Context API** – Globális állapotkezelés.
- **React Bootstrap** – Gyors, reszponzív elrendezések.
- **Material UI** – Modern, interaktív UI elemek.

### Backend
- **NestJS** – Skálázható, TypeScript alapú Node.js keretrendszer.
- **Prisma ORM** – Típusbiztos adatkezelés.
- **MySQL** – Relációs adatbázis-kezelő.
- **Jest** – Automatizált tesztelési környezet.

---

## 🗄️ Adatbázis séma
A rendszer relációs adatbázist használ, normalizált struktúrával.

**Fő entitások:**
* **User (Customer):** Felhasználói adatok, jelszavak és jogosultságok (Role).
* **Product:** Termékek ára, leírása és márkája.
* **Category:** Hierarchikus struktúra a rendszerezéshez.
* **CartItem:** Ideiglenes kosár elemek (LocalStorage + backend szinkron).
* **Order & OrderItem:** Véglegesített rendelések és azok részletei.

---

## 🔌 API Dokumentáció

### Termékek szűrése
`GET /termek?search={név}&minPrice={min}&maxPrice={max}&category={id}&brand={márka}`

| Paraméter | Típus | Kötelező | Leírás |
| :--- | :--- | :---: | :--- |
| `search` | string | Nem | Keresés név vagy leírás alapján |
| `minPrice` | number | Nem | Minimum ár szűrés |
| `maxPrice` | number | Nem | Maximum ár szűrés |
| `category` | number | Nem | Kategória azonosító |
| `brand` | string | Nem | Márka alapú szűrés |

---

## 🧪 Tesztelés
A kódminőséget automatizált tesztekkel biztosítjuk.

**Unit tesztek:**
```bash
npm run test
E2E (End-to-End) tesztek:

Bash
npm run test:e2e
🚀 További fejlesztési tervek
[ ] Online fizetés: Stripe vagy Barion integráció.

[ ] Kép feltöltés: AWS S3 vagy Cloudinary felhő alapú tárolás.

[ ] Email értesítések: Automatikus visszaigazolás és szállítási státusz küldése.

📊 Összegzés
✅ Full-stack alkalmazás (frontend + backend)

✅ 6 fő adatbázis entitás

✅ 100% CRUD lefedettség

✅ JWT-alapú biztonság
