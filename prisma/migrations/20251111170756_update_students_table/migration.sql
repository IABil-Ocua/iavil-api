/*
  Warnings:

  - You are about to drop the column `avatar` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `employmentStatus` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `graduationYear` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number_2` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `qualificationId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `students` table. All the data in the column will be lost.
  - The `status` column on the `students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_CertificationToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExperienceToStudent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qualification` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `students` table without a default value. This is not possible if the table is not empty.
  - Made the column `gender` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_CertificationToStudent" DROP CONSTRAINT "_CertificationToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CertificationToStudent" DROP CONSTRAINT "_CertificationToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExperienceToStudent" DROP CONSTRAINT "_ExperienceToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExperienceToStudent" DROP CONSTRAINT "_ExperienceToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_qualificationId_fkey";

-- DropIndex
DROP INDEX "students_email_key";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "avatar",
DROP COLUMN "bio",
DROP COLUMN "createdAt",
DROP COLUMN "employmentStatus",
DROP COLUMN "graduationYear",
DROP COLUMN "phone_number",
DROP COLUMN "phone_number_2",
DROP COLUMN "qualificationId",
DROP COLUMN "updatedAt",
ADD COLUMN     "actual_district" TEXT,
ADD COLUMN     "actual_province" TEXT,
ADD COLUMN     "birth_province" TEXT,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "company_phone" TEXT,
ADD COLUMN     "completion_year_1" TEXT,
ADD COLUMN     "completion_year_2" TEXT,
ADD COLUMN     "completion_year_3" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_occupation" TEXT,
ADD COLUMN     "father_affiliation" TEXT,
ADD COLUMN     "guardian_address" TEXT,
ADD COLUMN     "guardian_name" TEXT,
ADD COLUMN     "guardian_phone" TEXT,
ADD COLUMN     "id_number" TEXT,
ADD COLUMN     "level_1" TEXT,
ADD COLUMN     "level_2" TEXT,
ADD COLUMN     "level_3" TEXT,
ADD COLUMN     "mother_affiliation" TEXT,
ADD COLUMN     "observation_1" TEXT,
ADD COLUMN     "observation_2" TEXT,
ADD COLUMN     "observation_3" TEXT,
ADD COLUMN     "phone_1" TEXT,
ADD COLUMN     "phone_2" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "residency_regime_1" TEXT,
ADD COLUMN     "residency_regime_2" TEXT,
ADD COLUMN     "residency_regime_3" TEXT,
ADD COLUMN     "start_year" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "year_1" TEXT,
ADD COLUMN     "year_2" TEXT,
ADD COLUMN     "year_3" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT,
ALTER COLUMN "birth_date" SET DATA TYPE DATE,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "scholarship" DROP DEFAULT,
ALTER COLUMN "scholarship" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_CertificationToStudent";

-- DropTable
DROP TABLE "_ExperienceToStudent";

-- CreateIndex
CREATE UNIQUE INDEX "students_code_key" ON "students"("code");
