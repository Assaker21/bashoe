/*
  Warnings:

  - You are about to drop the column `longDescription` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `itemvariant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `itemvariant` DROP FOREIGN KEY `itemVariant_itemId_fkey`;

-- AlterTable
ALTER TABLE `address` ADD COLUMN `address` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `sku` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `longDescription`,
    DROP COLUMN `shortDescription`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `itemvariant` DROP COLUMN `itemId`,
    ADD COLUMN `itemVariantGroupId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `orderStatusId` INTEGER NULL;

-- CreateTable
CREATE TABLE `itemVariantGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_itemToitemVariant` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_itemToitemVariant_AB_unique`(`A`, `B`),
    INDEX `_itemToitemVariant_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itemVariant` ADD CONSTRAINT `itemVariant_itemVariantGroupId_fkey` FOREIGN KEY (`itemVariantGroupId`) REFERENCES `itemVariantGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_orderStatusId_fkey` FOREIGN KEY (`orderStatusId`) REFERENCES `orderStatus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_itemToitemVariant` ADD CONSTRAINT `_itemToitemVariant_A_fkey` FOREIGN KEY (`A`) REFERENCES `item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_itemToitemVariant` ADD CONSTRAINT `_itemToitemVariant_B_fkey` FOREIGN KEY (`B`) REFERENCES `itemVariant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
