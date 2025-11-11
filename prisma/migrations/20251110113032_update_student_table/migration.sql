/*
  Warnings:

  - You are about to drop the column `first_name` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `students` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualificationId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qualifications" ALTER COLUMN "banner_url" DROP NOT NULL,
ALTER COLUMN "pdf_url" DROP NOT NULL,
ALTER COLUMN "notice_url" DROP NOT NULL,
ALTER COLUMN "knowledge_areas" DROP NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "financier" TEXT,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "phone_number_2" TEXT,
ADD COLUMN     "qualificationId" TEXT NOT NULL,
ADD COLUMN     "scholarship" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "specialty" TEXT;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "qualifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
