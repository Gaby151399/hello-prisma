/*
  Warnings:

  - Added the required column `status` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SALE', 'STOCK');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "Status" NOT NULL;
