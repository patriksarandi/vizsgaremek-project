/*
  Warnings:

  - A unique constraint covering the columns `[VevoNev]` on the table `Vevo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Vevo_VevoNev_key` ON `Vevo`(`VevoNev`);
