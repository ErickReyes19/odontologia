-- CreateTable
CREATE TABLE `Permiso` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Permiso_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolPermiso` (
    `id` VARCHAR(191) NOT NULL,
    `rolId` VARCHAR(191) NOT NULL,
    `permisoId` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RolPermiso_permisoId_fkey`(`permisoId`),
    UNIQUE INDEX `RolPermiso_rolId_permisoId_key`(`rolId`, `permisoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Rol_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleados` (
    `id` VARCHAR(36) NOT NULL,
    `puesto_id` VARCHAR(36) NOT NULL,
    `identidad` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `correo` LONGTEXT NOT NULL,
    `FechaNacimiento` DATETIME(6) NULL,
    `fechaIngreso` DATETIME(6) NULL,
    `telefono` VARCHAR(20) NULL,
    `Vacaciones` INTEGER NOT NULL,
    `genero` VARCHAR(20) NULL,
    `activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Empleados_puesto_id_idx`(`puesto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Puesto` (
    `Id` VARCHAR(36) NOT NULL,
    `Nombre` VARCHAR(100) NOT NULL,
    `Descripcion` VARCHAR(100) NOT NULL,
    `Activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(36) NOT NULL,
    `empleado_id` VARCHAR(36) NOT NULL,
    `usuario` VARCHAR(50) NOT NULL,
    `contrasena` LONGTEXT NOT NULL,
    `DebeCambiarPassword` BOOLEAN NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `rol_id` VARCHAR(36) NOT NULL,
    `activo` BIT(1) NOT NULL,

    UNIQUE INDEX `IX_Usuarios_empleado_id`(`empleado_id`),
    INDEX `IX_Usuarios_rol_id`(`rol_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `token` VARCHAR(128) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PasswordResetToken_token_key`(`token`),
    INDEX `IX_PasswordResetToken_userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seguro` (
    `id` VARCHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paciente` (
    `id` VARCHAR(36) NOT NULL,
    `identidad` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `fechaNacimiento` DATETIME(6) NULL,
    `genero` VARCHAR(20) NULL,
    `telefono` VARCHAR(20) NULL,
    `correo` VARCHAR(150) NULL,
    `direccion` VARCHAR(255) NULL,
    `seguroId` VARCHAR(36) NULL,
    `activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Paciente_identidad_key`(`identidad`),
    INDEX `Paciente_seguroId_idx`(`seguroId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profesion` (
    `id` VARCHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Profesion_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicios` (
    `id` VARCHAR(36) NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `precioBase` DECIMAL(10, 2) NOT NULL,
    `duracionMin` INTEGER NOT NULL,
    `activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicos` (
    `id` VARCHAR(36) NOT NULL,
    `idEmpleado` VARCHAR(36) NOT NULL,
    `profesionId` VARCHAR(36) NOT NULL,
    `activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Medicos_idEmpleado_key`(`idEmpleado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicos_Servicios` (
    `id` VARCHAR(191) NOT NULL,
    `medicoId` VARCHAR(36) NOT NULL,
    `servicioId` VARCHAR(36) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Medicos_Servicios_servicioId_idx`(`servicioId`),
    UNIQUE INDEX `Medicos_Servicios_medicoId_servicioId_key`(`medicoId`, `servicioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultorio` (
    `id` VARCHAR(36) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `ubicacion` VARCHAR(150) NULL,
    `activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cita` (
    `id` VARCHAR(36) NOT NULL,
    `pacienteId` VARCHAR(36) NOT NULL,
    `medicoId` VARCHAR(36) NOT NULL,
    `consultorioId` VARCHAR(36) NOT NULL,
    `fechaHora` DATETIME(6) NOT NULL,
    `estado` VARCHAR(20) NOT NULL,
    `motivo` VARCHAR(255) NULL,
    `observacion` VARCHAR(255) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Cita_pacienteId_idx`(`pacienteId`),
    INDEX `Cita_medicoId_idx`(`medicoId`),
    INDEX `Cita_consultorioId_idx`(`consultorioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consulta` (
    `id` VARCHAR(36) NOT NULL,
    `citaId` VARCHAR(36) NOT NULL,
    `diagnostico` VARCHAR(255) NULL,
    `notas` TEXT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Consulta_citaId_key`(`citaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsultaServicio` (
    `id` VARCHAR(36) NOT NULL,
    `consultaId` VARCHAR(36) NOT NULL,
    `servicioId` VARCHAR(36) NOT NULL,
    `precioAplicado` DECIMAL(10, 2) NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ConsultaServicio_consultaId_idx`(`consultaId`),
    INDEX `ConsultaServicio_servicioId_idx`(`servicioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Pago` (
    `id` VARCHAR(36) NOT NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `metodo` ENUM('EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'SEGURO', 'OTRO') NOT NULL,
    `referencia` VARCHAR(100) NULL,
    `fechaPago` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `estado` ENUM('REGISTRADO', 'APLICADO', 'REVERTIDO') NOT NULL DEFAULT 'REGISTRADO',
    `comentario` VARCHAR(255) NULL,
    `usuarioId` VARCHAR(36) NULL,
    `pacienteId` VARCHAR(36) NULL,
    `consultaId` VARCHAR(36) NULL,
    `cotizacionId` VARCHAR(36) NULL,
    `planTratamientoId` VARCHAR(36) NULL,
    `financiamientoId` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Pago_pacienteId_idx`(`pacienteId`),
    INDEX `Pago_consultaId_idx`(`consultaId`),
    INDEX `Pago_cotizacionId_idx`(`cotizacionId`),
    INDEX `Pago_planTratamientoId_idx`(`planTratamientoId`),
    INDEX `Pago_financiamientoId_idx`(`financiamientoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Financiamiento` (
    `id` VARCHAR(36) NOT NULL,
    `pacienteId` VARCHAR(36) NOT NULL,
    `cotizacionId` VARCHAR(36) NULL,
    `planTratamientoId` VARCHAR(36) NULL,
    `montoTotal` DECIMAL(10, 2) NOT NULL,
    `anticipo` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `saldo` DECIMAL(10, 2) NOT NULL,
    `cuotas` INTEGER NOT NULL,
    `interes` DECIMAL(5, 2) NOT NULL DEFAULT 0,
    `fechaInicio` DATETIME(6) NOT NULL,
    `fechaFin` DATETIME(6) NULL,
    `estado` ENUM('ACTIVO', 'PAGADO', 'VENCIDO', 'CANCELADO') NOT NULL DEFAULT 'ACTIVO',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Financiamiento_pacienteId_idx`(`pacienteId`),
    INDEX `Financiamiento_cotizacionId_idx`(`cotizacionId`),
    INDEX `Financiamiento_planTratamientoId_idx`(`planTratamientoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CuotaFinanciamiento` (
    `id` VARCHAR(36) NOT NULL,
    `financiamientoId` VARCHAR(36) NOT NULL,
    `numero` INTEGER NOT NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `fechaVencimiento` DATETIME(6) NOT NULL,
    `pagada` BIT(1) NOT NULL DEFAULT false,
    `fechaPago` DATETIME(3) NULL,
    `pagoId` VARCHAR(36) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `CuotaFinanciamiento_financiamientoId_idx`(`financiamientoId`),
    INDEX `CuotaFinanciamiento_pagoId_idx`(`pagoId`),
    UNIQUE INDEX `CuotaFinanciamiento_financiamientoId_numero_key`(`financiamientoId`, `numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_permisoId_fkey` FOREIGN KEY (`permisoId`) REFERENCES `Permiso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_puesto_id_fkey` FOREIGN KEY (`puesto_id`) REFERENCES `Puesto`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `FK_Usuarios_Empleados_empleado_id` FOREIGN KEY (`empleado_id`) REFERENCES `Empleados`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_seguroId_fkey` FOREIGN KEY (`seguroId`) REFERENCES `Seguro`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicos` ADD CONSTRAINT `Medicos_idEmpleado_fkey` FOREIGN KEY (`idEmpleado`) REFERENCES `Empleados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicos` ADD CONSTRAINT `Medicos_profesionId_fkey` FOREIGN KEY (`profesionId`) REFERENCES `Profesion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicos_Servicios` ADD CONSTRAINT `Medicos_Servicios_medicoId_fkey` FOREIGN KEY (`medicoId`) REFERENCES `Medicos`(`idEmpleado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicos_Servicios` ADD CONSTRAINT `Medicos_Servicios_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_medicoId_fkey` FOREIGN KEY (`medicoId`) REFERENCES `Medicos`(`idEmpleado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_consultorioId_fkey` FOREIGN KEY (`consultorioId`) REFERENCES `Consultorio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_citaId_fkey` FOREIGN KEY (`citaId`) REFERENCES `Cita`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultaServicio` ADD CONSTRAINT `ConsultaServicio_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultaServicio` ADD CONSTRAINT `ConsultaServicio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotizacion` ADD CONSTRAINT `Cotizacion_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotizacionServicio` ADD CONSTRAINT `CotizacionServicio_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotizacionServicio` ADD CONSTRAINT `CotizacionServicio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_planTratamientoId_fkey` FOREIGN KEY (`planTratamientoId`) REFERENCES `PlanTratamiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_financiamientoId_fkey` FOREIGN KEY (`financiamientoId`) REFERENCES `Financiamiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Financiamiento` ADD CONSTRAINT `Financiamiento_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Financiamiento` ADD CONSTRAINT `Financiamiento_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Financiamiento` ADD CONSTRAINT `Financiamiento_planTratamientoId_fkey` FOREIGN KEY (`planTratamientoId`) REFERENCES `PlanTratamiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CuotaFinanciamiento` ADD CONSTRAINT `CuotaFinanciamiento_financiamientoId_fkey` FOREIGN KEY (`financiamientoId`) REFERENCES `Financiamiento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CuotaFinanciamiento` ADD CONSTRAINT `CuotaFinanciamiento_pagoId_fkey` FOREIGN KEY (`pagoId`) REFERENCES `Pago`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
