/*
  Warnings:

  - A unique constraint covering the columns `[Nev]` on the table `Kategoria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Vevo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vevo` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Kategoria_Nev_key` ON `Kategoria`(`Nev`);
