-- CreateTable
CREATE TABLE `Kategoria` (
    `KategoriaID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nev` VARCHAR(100) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Kategoria_Nev_key`(`Nev`),
    PRIMARY KEY (`KategoriaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Termek` (
    `TermekID` INTEGER NOT NULL AUTO_INCREMENT,
    `KategoriaID` INTEGER NOT NULL,
    `TermekNev` VARCHAR(255) NOT NULL,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `TermekAr` DECIMAL(10, 2) NOT NULL,
    `Keszlet` INTEGER NOT NULL DEFAULT 0,
    `Brand` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Termek_TermekNev_key`(`TermekNev`),
    PRIMARY KEY (`TermekID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vevo` (
    `VevoID` INTEGER NOT NULL AUTO_INCREMENT,
    `VevoNev` VARCHAR(150) NOT NULL,
    `Vezeteknev` VARCHAR(191) NULL,
    `Keresztnev` VARCHAR(191) NULL,
    `Telefonszam` VARCHAR(191) NULL,
    `VevoEmail` VARCHAR(150) NOT NULL,
    `VevoJelszo` VARCHAR(255) NOT NULL,
    `Cim` VARCHAR(255) NOT NULL,
    `Role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Vevo_VevoNev_key`(`VevoNev`),
    UNIQUE INDEX `Vevo_VevoEmail_key`(`VevoEmail`),
    PRIMARY KEY (`VevoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FizetesiKosar` (
    `KosarID` INTEGER NOT NULL AUTO_INCREMENT,
    `VevoID` INTEGER NOT NULL,

    UNIQUE INDEX `FizetesiKosar_VevoID_key`(`VevoID`),
    PRIMARY KEY (`KosarID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KosarTetel` (
    `KosarTetelID` INTEGER NOT NULL AUTO_INCREMENT,
    `KosarID` INTEGER NOT NULL,
    `TermekID` INTEGER NOT NULL,
    `TetelMennyiseg` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `KosarTetel_KosarID_TermekID_key`(`KosarID`, `TermekID`),
    PRIMARY KEY (`KosarTetelID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rendeles` (
    `RendelesID` INTEGER NOT NULL AUTO_INCREMENT,
    `VevoID` INTEGER NOT NULL,
    `RendelesiDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `RendelesiVegosszeg` DECIMAL(10, 2) NOT NULL,
    `Statusz` VARCHAR(50) NOT NULL DEFAULT 'Feldolgozás alatt',

    PRIMARY KEY (`RendelesID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RendeltTermek` (
    `RendeltTermekID` INTEGER NOT NULL AUTO_INCREMENT,
    `RendelesID` INTEGER NOT NULL,
    `TermekID` INTEGER NOT NULL,
    `RendeltMennyiseg` INTEGER NOT NULL,
    `RendeltEgysegar` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`RendeltTermekID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fizetes` (
    `FizetesID` INTEGER NOT NULL AUTO_INCREMENT,
    `RendelesID` INTEGER NOT NULL,
    `FizetesMod` VARCHAR(50) NOT NULL,
    `Datum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Allapot` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`FizetesID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Termek` ADD CONSTRAINT `Termek_KategoriaID_fkey` FOREIGN KEY (`KategoriaID`) REFERENCES `Kategoria`(`KategoriaID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FizetesiKosar` ADD CONSTRAINT `FizetesiKosar_VevoID_fkey` FOREIGN KEY (`VevoID`) REFERENCES `Vevo`(`VevoID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KosarTetel` ADD CONSTRAINT `KosarTetel_KosarID_fkey` FOREIGN KEY (`KosarID`) REFERENCES `FizetesiKosar`(`KosarID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KosarTetel` ADD CONSTRAINT `KosarTetel_TermekID_fkey` FOREIGN KEY (`TermekID`) REFERENCES `Termek`(`TermekID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rendeles` ADD CONSTRAINT `Rendeles_VevoID_fkey` FOREIGN KEY (`VevoID`) REFERENCES `Vevo`(`VevoID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RendeltTermek` ADD CONSTRAINT `RendeltTermek_RendelesID_fkey` FOREIGN KEY (`RendelesID`) REFERENCES `Rendeles`(`RendelesID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RendeltTermek` ADD CONSTRAINT `RendeltTermek_TermekID_fkey` FOREIGN KEY (`TermekID`) REFERENCES `Termek`(`TermekID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fizetes` ADD CONSTRAINT `Fizetes_RendelesID_fkey` FOREIGN KEY (`RendelesID`) REFERENCES `Rendeles`(`RendelesID`) ON DELETE RESTRICT ON UPDATE CASCADE;
