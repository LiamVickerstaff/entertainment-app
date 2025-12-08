/*
  Warnings:

  - The values [MOVIE,TV] on the enum `MediaType` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `externalId` on the `Bookmark` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MediaType_new" AS ENUM ('movie', 'tv');
ALTER TABLE "Bookmark" ALTER COLUMN "mediaType" TYPE "MediaType_new" USING ("mediaType"::text::"MediaType_new");
ALTER TYPE "MediaType" RENAME TO "MediaType_old";
ALTER TYPE "MediaType_new" RENAME TO "MediaType";
DROP TYPE "public"."MediaType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "externalId",
ADD COLUMN     "externalId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_externalId_key" ON "Bookmark"("userId", "externalId");
