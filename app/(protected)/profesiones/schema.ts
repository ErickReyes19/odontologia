import * as z from 'zod';

export const ProfesionSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string(),
  activo: z.boolean(), 
  });

export type Profesion = z.infer<typeof ProfesionSchema>;
