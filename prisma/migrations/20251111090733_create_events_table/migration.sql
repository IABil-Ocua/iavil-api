-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('TRAINING', 'SEMINAR', 'CONFERENCE');

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "location" TEXT,
    "type" "EventType" NOT NULL,
    "imageUrl" TEXT,
    "organizer" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
