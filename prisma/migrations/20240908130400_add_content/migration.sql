-- CreateTable
CREATE TABLE `content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `info` VARCHAR(191) NULL,
    `sequenceNumber` INTEGER NULL,
    `location` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `dataSelection` VARCHAR(191) NULL,
    `data` JSON NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
