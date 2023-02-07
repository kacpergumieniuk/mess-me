/*
  Warnings:

  - You are about to drop the `_friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_friends";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Friendship" (
    "userId1" TEXT NOT NULL,
    "userId2" TEXT NOT NULL,

    PRIMARY KEY ("userId1", "userId2"),
    CONSTRAINT "Friendship_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Friendship_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
