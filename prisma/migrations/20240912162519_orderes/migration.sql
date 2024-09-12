-- AlterTable
ALTER TABLE `order` ADD COLUMN `paymentMethod` VARCHAR(191) NULL,
    ADD COLUMN `shippingFee` DOUBLE NULL;
