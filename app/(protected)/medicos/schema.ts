import * as z from "zod";

export const MedicoSchema = z.object({
  id: z.string().optional(),
  idEmpleado: z.string().min(1),
  profesionId: z.string().min(1),
  activo: z.boolean(),
  createAt: z.date().optional(),
  updateAt: z.date().optional(),

  // empleado mínimo
  empleado: z
    .object({
      id: z.string(),
      nombre: z.string(),
      apellido: z.string(),
      activo: z.boolean(),
    })
    .optional(),

  profesion: z
    .object({
      id: z.string(),
      nombre: z.string(),
      descripcion: z.string(),
      activo: z.boolean(),
    })
    .optional(),
});

export type Medico = z.infer<typeof MedicoSchema>;
