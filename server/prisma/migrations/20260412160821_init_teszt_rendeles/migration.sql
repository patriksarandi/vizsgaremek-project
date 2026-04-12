-- CreateTable
CREATE TABLE `Token` (
    `token` VARCHAR(191) NOT NULL,
    `vevoId` INTEGER NOT NULL,

    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_vevoId_fkey` FOREIGN KEY (`vevoId`) REFERENCES `Vevo`(`VevoID`) ON DELETE CASCADE ON UPDATE CASCADE;
