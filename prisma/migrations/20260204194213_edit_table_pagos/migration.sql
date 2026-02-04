/*
  Warnings:

  - You are about to drop the column `precioAplicado` on the `consultaproducto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `consulta` ADD COLUMN `financiamientoId` VARCHAR(36) NULL,
    ADD COLUMN `seguimientoId` VARCHAR(36) NULL,
    ADD COLUMN `total` DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `consultaproducto` DROP COLUMN `precioAplicado`;

-- AlterTable
ALTER TABLE `cuotafinanciamiento` MODIFY `pagada` BIT(1) NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `planetapa` MODIFY `programarCita` BIT(1) NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX `Consulta_seguimientoId_idx` ON `Consulta`(`seguimientoId`);

-- CreateIndex
CREATE INDEX `Consulta_financiamientoId_idx` ON `Consulta`(`financiamientoId`);

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_seguimientoId_fkey` FOREIGN KEY (`seguimientoId`) REFERENCES `Seguimiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_financiamientoId_fkey` FOREIGN KEY (`financiamientoId`) REFERENCES `Financiamiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
