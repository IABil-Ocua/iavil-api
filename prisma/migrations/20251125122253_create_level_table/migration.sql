/*
  Warnings:

  - You are about to drop the column `duration` on the `qualifications` table. All the data in the column will be lost.
  - You are about to drop the column `notice_url` on the `qualifications` table. All the data in the column will be lost.
  - You are about to drop the `module_levels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modules` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `credits` to the `qualifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "module_levels" DROP CONSTRAINT "module_levels_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_qualificationId_fkey";

-- AlterTable
ALTER TABLE "qualifications" DROP COLUMN "duration",
DROP COLUMN "notice_url",
ADD COLUMN     "credits" INTEGER NOT NULL;

-- DropTable
DROP TABLE "module_levels";

-- DropTable
DROP TABLE "modules";

-- CreateTable
CREATE TABLE "qualifications_levels" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "notice_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qualifications_levels_pkey" PRIMARY KEY ("id")
);
