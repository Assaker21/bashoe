/*
  Warnings:

  - You are about to drop the column `itemId` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_itemId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `itemId`;

-- CreateTable
CREATE TABLE `_categoryToitem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_categoryToitem_AB_unique`(`A`, `B`),
    INDEX `_categoryToitem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_categoryToitem` ADD CONSTRAINT `_categoryToitem_A_fkey` FOREIGN KEY (`A`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_categoryToitem` ADD CONSTRAINT `_categoryToitem_B_fkey` FOREIGN KEY (`B`) REFERENCES `item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
