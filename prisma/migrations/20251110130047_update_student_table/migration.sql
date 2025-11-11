-- AlterTable
ALTER TABLE "students" ADD COLUMN     "graduationYear" TEXT,
ALTER COLUMN "birth_date" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL;
