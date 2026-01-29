import * as z from "zod";

export const EmpleadoSchema = z.object({
  id: z.string().optional(), // Ahora obligatorio y debe ser UUID
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  correo: z.string().email("Correo no válido"),

  identidad: z.string().min(1, "La identificación es requerida"),

  fechaNacimiento: z
    .date({
      required_error: "La fecha de nacimiento es requerida",
      invalid_type_error: "La fecha de nacimiento debe ser una fecha válida",
    })
    .refine((d) => d <= new Date(), "La fecha de nacimiento no puede ser futura"),

  fechaIngreso: z
    .date({
      required_error: "La fecha de ingreso es requerida",
      invalid_type_error: "La fecha de ingreso debe ser una fecha válida",
    })
    .refine((d) => d <= new Date(), "La fecha de ingreso no puede ser futura"),


  telefono: z
    .string()
    .min(1, "El teléfono es requerido")
    .regex(/^[0-9\-+() ]+$/, "Formato de teléfono inválido"),


  genero: z.string().min(1, "El género es requerido"),
  vacaciones: z
    .number()
    .min(0, "Las vacaciones no pueden ser negativas"),

  activo: z.boolean(),

  usuario: z.string().optional(),

  puesto_id: z.string(),

  // Estos campos ahora también son obligatorios
  puesto: z.string().min(1).optional(),
});

export type Empleado = z.infer<typeof EmpleadoSchema>;
