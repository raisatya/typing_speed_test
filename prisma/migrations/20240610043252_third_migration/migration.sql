-- CreateTable
CREATE TABLE "TestResult" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "wpm" INTEGER NOT NULL,
    "deviceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);
