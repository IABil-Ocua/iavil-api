/*
  Warnings:

  - Added the required column `qualificationId` to the `qualifications_levels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qualifications_levels" ADD COLUMN     "qualificationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "qualifications_levels" ADD CONSTRAINT "qualifications_levels_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "qualifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
