-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "profileImage" TEXT,
    "facebookURL" TEXT,
    "instagramURL" TEXT,
    "linkedinURL" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);
