/*
 Warnings:
 
 - You are about to drop the `_itemtoitemvariant` table. If the table is not empty, all the data it contains will be lost.
 
 */
-- DropForeignKey
ALTER TABLE
  `_itemToitemVariant` DROP FOREIGN KEY `_itemToitemVariant_A_fkey`;

-- DropForeignKey
ALTER TABLE
  `_itemToitemVariant` DROP FOREIGN KEY `_itemToitemVariant_B_fkey`;

-- AlterTable
ALTER TABLE
  `item`
ADD
  COLUMN `itemVariantId` INTEGER NULL;

-- DropTable
DROP TABLE `_itemToitemVariant`;

-- CreateTable
CREATE TABLE `itemCustomVariant` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `itemVariantId` INTEGER NULL,
  `itemVariantGroupId` INTEGER NULL,
  `itemId` INTEGER NULL,
  `description` VARCHAR(191) NULL,
  `url` LONGTEXT NULL,
  `sequenceNumber` DOUBLE NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE
  `item`
ADD
  CONSTRAINT `item_itemVariantId_fkey` FOREIGN KEY (`itemVariantId`) REFERENCES `itemVariant`(`id`) ON DELETE
SET
  NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `itemCustomVariant`
ADD
  CONSTRAINT `itemCustomVariant_itemVariantId_fkey` FOREIGN KEY (`itemVariantId`) REFERENCES `itemVariant`(`id`) ON DELETE
SET
  NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `itemCustomVariant`
ADD
  CONSTRAINT `itemCustomVariant_itemVariantGroupId_fkey` FOREIGN KEY (`itemVariantGroupId`) REFERENCES `itemVariantGroup`(`id`) ON DELETE
SET
  NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `itemCustomVariant`
ADD
  CONSTRAINT `itemCustomVariant_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE
SET
  NULL ON UPDATE CASCADE;