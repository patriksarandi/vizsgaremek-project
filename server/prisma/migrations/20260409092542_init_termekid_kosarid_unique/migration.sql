/*
  Warnings:

  - A unique constraint covering the columns `[KosarID,TermekID]` on the table `KosarTetel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `KosarTetel_KosarID_TermekID_key` ON `KosarTetel`(`KosarID`, `TermekID`);
