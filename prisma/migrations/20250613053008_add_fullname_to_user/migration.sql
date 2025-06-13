/*
  Warnings:

  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "fullName" TEXT;

-- Update existing records
UPDATE "User" SET "fullName" = email WHERE "fullName" IS NULL;

-- Make the column required
ALTER TABLE "User" ALTER COLUMN "fullName" SET NOT NULL;
