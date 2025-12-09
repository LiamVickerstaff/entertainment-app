/*
  Warnings:

  - Added the required column `adult` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "adult" BOOLEAN NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
