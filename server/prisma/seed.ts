import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Hangszerbolt Seedelés indítása ---');

  const hashedAdminPassword = await bcrypt.hash('admin12345', 10);

  // 1. Admin létrehozása
  await prisma.vevo.upsert({
    where: { VevoEmail: 'admin@admin.hu' },
    update: { VevoJelszo: hashedAdminPassword },
    create: {
      VevoNev: 'Rendszer Admin',
      VevoEmail: 'admin@admin.hu',
      VevoJelszo: hashedAdminPassword,
      Cim: 'Budapest',
      Role: 'ADMIN',
    },
  });

  // 2. Kategóriák
  const kategoriaNevek = [
    'Gitár', 'BasszusGitár', 'Billentyűs', 'Ütős', 
    'Fúvós', 'Vonós', 'Stúdió', 'Tartozékok'
  ];

  const kategoriak: any = {};
  for (const nev of kategoriaNevek) {
    const kat = await prisma.kategoria.upsert({
      where: { Nev: nev },
      update: {},
      create: { Nev: nev },
    });
    kategoriak[nev] = kat.KategoriaID;
  }

  // 3. Termékek (Most már a kötelező Brand mezővel!)
  const termekek = [
    {
      TermekNev: 'Fender Stratocaster Electric Guitar',
      TermekAr: 549000,
      Keszlet: 3,
      Brand: 'Fender',
      KategoriaID: kategoriak['Gitár'],
    },
    {
      TermekNev: 'Ibanez SR300EB Bass Guitar',
      TermekAr: 139000,
      Keszlet: 5,
      Brand: 'Ibanez',
      KategoriaID: kategoriak['BasszusGitár'],
    },
    {
      TermekNev: 'Yamaha P-145 Digital Piano',
      TermekAr: 185000,
      Keszlet: 4,
      Brand: 'Yamaha',
      KategoriaID: kategoriak['Billentyűs'],
    },
    {
      TermekNev: 'Pearl Roadshow Drum Kit',
      TermekAr: 210000,
      Keszlet: 2,
      Brand: 'Pearl',
      KategoriaID: kategoriak['Ütős'],
    },
    {
      TermekNev: 'Yamaha YAS-280 Saxophone',
      TermekAr: 380000,
      Keszlet: 2,
      Brand: 'Yamaha',
      KategoriaID: kategoriak['Fúvós'],
    },
    {
      TermekNev: 'Stentor Student I Violin 4/4',
      TermekAr: 65000,
      Keszlet: 6,
      Brand: 'Stentor',
      KategoriaID: kategoriak['Vonós'],
    },
    {
      TermekNev: 'Focusrite Scarlett 2i2 Audio Interface',
      TermekAr: 75000,
      Keszlet: 10,
      Brand: 'Focusrite',
      KategoriaID: kategoriak['Stúdió'],
    },
    {
      TermekNev: 'Ernie Ball Regular Slinky Guitar Strings',
      TermekAr: 2900,
      Keszlet: 50,
      Brand: 'Ernie Ball',
      KategoriaID: kategoriak['Tartozékok'],
    }
  ];

  for (let i = 0; i < termekek.length; i++) {
    await prisma.termek.upsert({
      where: { TermekID: i + 1 },
      update: termekek[i], // Frissítjük is, ha már létezik
      create: termekek[i],
    });
  }

  console.log('--- Seedelés kész: Minden kategória és hangszer feltöltve! ---');
}

main()
  .catch((e) => {
    console.error('Hiba a seedelés során:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });