-- AlterTable
ALTER TABLE `fizetesikosar` MODIFY `KosarID` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateTable
CREATE TABLE `Ertekeles` (
    `ErtekelesID` INTEGER NOT NULL AUTO_INCREMENT,
    `VevoID` INTEGER NOT NULL,
    `TermekID` INTEGER NOT NULL,
    `ErtekelesSzam` INTEGER NOT NULL,

    UNIQUE INDEX `Ertekeles_VevoID_TermekID_key`(`VevoID`, `TermekID`),
    PRIMARY KEY (`ErtekelesID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ertekeles` ADD CONSTRAINT `Ertekeles_VevoID_fkey` FOREIGN KEY (`VevoID`) REFERENCES `Vevo`(`VevoID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ertekeles` ADD CONSTRAINT `Ertekeles_TermekID_fkey` FOREIGN KEY (`TermekID`) REFERENCES `Termek`(`TermekID`) ON DELETE RESTRICT ON UPDATE CASCADE;
