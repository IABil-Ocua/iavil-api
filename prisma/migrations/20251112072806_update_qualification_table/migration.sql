/*
  Warnings:

  - You are about to drop the column `pad_url` on the `module_levels` table. All the data in the column will be lost.
  - You are about to drop the column `pdf_url` on the `qualifications` table. All the data in the column will be lost.
  - Added the required column `pdf_url` to the `module_levels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "module_levels" DROP COLUMN "pad_url",
ADD COLUMN     "pdf_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "qualifications" DROP COLUMN "pdf_url";
