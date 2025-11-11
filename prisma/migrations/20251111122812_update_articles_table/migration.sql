/*
  Warnings:

  - You are about to drop the column `excerpt` on the `articles` table. All the data in the column will be lost.
  - Added the required column `category` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('INNOVATION', 'PUBLICATION');

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "excerpt",
DROP COLUMN "category",
ADD COLUMN     "category" "ArticleType" NOT NULL;
