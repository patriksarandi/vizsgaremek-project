/*
  Warnings:

  - A unique constraint covering the columns `[TermekNev]` on the table `Termek` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Termek_TermekNev_key` ON `Termek`(`TermekNev`);
