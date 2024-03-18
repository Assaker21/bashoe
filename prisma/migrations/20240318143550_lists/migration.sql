-- CreateTable
CREATE TABLE `list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `content` JSON NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
