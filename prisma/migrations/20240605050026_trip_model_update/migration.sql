-- AlterTable
ALTER TABLE "trip" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "itinerary" TEXT[],
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "travelType" TEXT NOT NULL DEFAULT '';
