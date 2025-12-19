/*
  Warnings:

  - Added the required column `url` to the `job-vacancies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job-vacancies" ADD COLUMN     "url" TEXT NOT NULL;
