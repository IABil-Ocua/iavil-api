/*
  Warnings:

  - You are about to drop the column `area` on the `job-vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `job-vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `job-vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `job-vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `job-vacancies` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `job-vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `job-vacancies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job-vacancies" DROP COLUMN "area",
DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "publishedAt",
DROP COLUMN "requirements",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT NOT NULL;
