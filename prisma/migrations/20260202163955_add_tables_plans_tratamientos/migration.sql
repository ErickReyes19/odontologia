-- CreateTable
CREATE TABLE `PlanTratamiento` (
    `id` VARCHAR(36) NOT NULL,
    `pacienteId` VARCHAR(36) NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `estado` ENUM('ACTIVO', 'PAUSADO', 'COMPLETADO', 'CANCELADO') NOT NULL DEFAULT 'ACTIVO',
    `fechaInicio` DATETIME(6) NOT NULL,
    `fechaFin` DATETIME(6) NULL,
    `medicoResponsableId` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `PlanTratamiento_pacienteId_idx`(`pacienteId`),
    INDEX `PlanTratamiento_medicoResponsableId_idx`(`medicoResponsableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanEtapa` (
    `id` VARCHAR(36) NOT NULL,
    `planId` VARCHAR(36) NOT NULL,
    `servicioId` VARCHAR(36) NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `orden` INTEGER NOT NULL DEFAULT 1,
    `intervaloDias` INTEGER NULL,
    `repeticiones` INTEGER NULL,
    `programarCita` BIT(1) NOT NULL DEFAULT true,
    `responsableMedicoId` VARCHAR(36) NULL,
    `crearDesdeConsultaId` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PlanEtapa_planId_idx`(`planId`),
    INDEX `PlanEtapa_servicioId_idx`(`servicioId`),
    INDEX `PlanEtapa_responsableMedicoId_idx`(`responsableMedicoId`),
    INDEX `PlanEtapa_crearDesdeConsultaId_idx`(`crearDesdeConsultaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seguimiento` (
    `id` VARCHAR(36) NOT NULL,
    `etapaId` VARCHAR(36) NOT NULL,
    `pacienteId` VARCHAR(36) NOT NULL,
    `fechaProgramada` DATETIME(6) NOT NULL,
    `fechaRealizada` DATETIME(6) NULL,
    `estado` ENUM('PROGRAMADO', 'REALIZADO', 'CANCELADO', 'NO_ASISTIO') NOT NULL DEFAULT 'PROGRAMADO',
    `nota` VARCHAR(255) NULL,
    `citaId` VARCHAR(36) NULL,
    `creadoPorId` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Seguimiento_etapaId_idx`(`etapaId`),
    INDEX `Seguimiento_pacienteId_idx`(`pacienteId`),
    INDEX `Seguimiento_citaId_idx`(`citaId`),
    INDEX `Seguimiento_fechaProgramada_idx`(`fechaProgramada`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlanTratamiento` ADD CONSTRAINT `PlanTratamiento_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanTratamiento` ADD CONSTRAINT `PlanTratamiento_medicoResponsableId_fkey` FOREIGN KEY (`medicoResponsableId`) REFERENCES `Medicos`(`idEmpleado`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanEtapa` ADD CONSTRAINT `PlanEtapa_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `PlanTratamiento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanEtapa` ADD CONSTRAINT `PlanEtapa_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanEtapa` ADD CONSTRAINT `PlanEtapa_responsableMedicoId_fkey` FOREIGN KEY (`responsableMedicoId`) REFERENCES `Medicos`(`idEmpleado`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanEtapa` ADD CONSTRAINT `PlanEtapa_crearDesdeConsultaId_fkey` FOREIGN KEY (`crearDesdeConsultaId`) REFERENCES `Consulta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_etapaId_fkey` FOREIGN KEY (`etapaId`) REFERENCES `PlanEtapa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_citaId_fkey` FOREIGN KEY (`citaId`) REFERENCES `Cita`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
