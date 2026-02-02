-- CreateTable
CREATE TABLE `Cotizacion` (
    `id` VARCHAR(36) NOT NULL,
    `pacienteId` VARCHAR(36) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` VARCHAR(20) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `observacion` VARCHAR(255) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Cotizacion_pacienteId_idx`(`pacienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CotizacionServicio` (
    `id` VARCHAR(36) NOT NULL,
    `cotizacionId` VARCHAR(36) NOT NULL,
    `servicioId` VARCHAR(36) NOT NULL,
    `precioUnitario` DECIMAL(10, 2) NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,
    `observacion` VARCHAR(255) NULL,

    INDEX `CotizacionServicio_servicioId_idx`(`servicioId`),
    UNIQUE INDEX `CotizacionServicio_cotizacionId_servicioId_key`(`cotizacionId`, `servicioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cotizacion` ADD CONSTRAINT `Cotizacion_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotizacionServicio` ADD CONSTRAINT `CotizacionServicio_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotizacionServicio` ADD CONSTRAINT `CotizacionServicio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
