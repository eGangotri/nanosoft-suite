-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "delete" BOOLEAN NOT NULL DEFAULT true;
