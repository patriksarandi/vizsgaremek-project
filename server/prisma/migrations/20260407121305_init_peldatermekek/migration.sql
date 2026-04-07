/*
  Warnings:

  - A unique constraint covering the columns `[Brand]` on the table `Termek` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Brand` to the `Termek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `termek` ADD COLUMN `Brand` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Termek_Brand_key` ON `Termek`(`Brand`);
