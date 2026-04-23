/*
  Warnings:

  - The primary key for the `ertekeles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ErtekelesID` on the `ertekeles` table. All the data in the column will be lost.
  - You are about to drop the `termekkep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `termekkep` DROP FOREIGN KEY `TermekKep_TermekID_fkey`;

-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `Token_vevoId_fkey`;

-- DropIndex
DROP INDEX `Ertekeles_VevoID_TermekID_key` ON `ertekeles`;

-- AlterTable
ALTER TABLE `ertekeles` DROP PRIMARY KEY,
    DROP COLUMN `ErtekelesID`,
    ADD PRIMARY KEY (`VevoID`, `TermekID`);

-- DropTable
DROP TABLE `termekkep`;

-- DropTable
DROP TABLE `token`;
