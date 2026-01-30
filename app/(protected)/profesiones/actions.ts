"use server";

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { Profesion, ProfesionSchema } from './schema';

/**
 * Obtiene todos los puestos
 */
export async function getProfesiones(): Promise<Profesion[]> {
  try {
    const records = await prisma.profesion.findMany();
    return records.map(r => ({
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion || "Sin descripción",
      activo: r.activo,
    }));
  } catch (error) {
    console.error("Error al obtener las profesiones:", error);
    return [];
  }
}

/**
 * Obtiene solo las profesiones activas
 */
export async function getProfesionesActivas(): Promise<Profesion[]> {
  try {
    const records = await prisma.profesion.findMany({ where: { activo: true } });
    return records.map(r => ({
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion || "Sin descripción",
      activo: r.activo,
    }));
  } catch (error) {
    console.error("Error al obtener profesiones activas:", error);
    return [];
  }
}


/**
 * Elimina un profesion por ID
 */
export async function deleteProfesion(id: string): Promise<{ success: true } | { success: false; error: string }> {
  try {
    if (!id) {
      return { success: false, error: "ID del la profesion es requerido" };
    }

    await prisma.profesion.delete({
      where: { id },
    });

    // Revalidar la página de profesion
    revalidatePath('/profesiones');
    
    return { success: true };
  } catch (error) {
    console.error(`Error al eliminar profesion con ID ${id}:`, error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Error desconocido al eliminar profesion" };
  }
}

/**
 * Obtiene un profesion por ID
 */
export async function getProfesionById(id: string): Promise<Profesion | null> {
  try {
    const r = await prisma.profesion.findUnique({ where: { id } });
    if (!r) return null;
    return {
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion || "Sin descripción",
      activo: r.activo,
    };
  } catch (error) {
    console.error(`Error al obtener profesion con ID ${id}:`, error);
    return null;
  }
}

/**
 * Crea un nuevo profesion
 */
export async function createProfesion(data: Profesion): Promise<{ success: true; data: Profesion } | { success: false; error: string }> {
  try {
    // Validar datos con Zod
    const validatedData = ProfesionSchema.parse({
      ...data,
      activo: data.activo ?? true,
    });

    const id = randomUUID();
    const r = await prisma.profesion.create({
      data: {
        id: id,
        nombre: validatedData.nombre,
        descripcion: validatedData.descripcion,
        activo: validatedData.activo,
      },
    });
    
    const result = {
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion || "Sin descripción",
      activo: r.activo,
    };

    // Revalidar la página de profesion
    revalidatePath('/profesiones');
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Error al crear profesion:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Error desconocido al crear profesion" };
  }
}

/**
 * Actualiza un puesto existente
 */
export async function updateProfesion(id: string, data: Partial<Profesion>): Promise<{ success: true; data: Profesion } | { success: false; error: string }> {
  try {
    if (!id) {
      return { success: false, error: "ID del profesion es requerido" };
    }

    // Validar datos con Zod (permitir campos parciales)
    const validatedData = ProfesionSchema.partial().parse(data);

    const r = await prisma.profesion.update({
      where: { id },
      data: {
        ...(validatedData.nombre && { nombre: validatedData.nombre }),
        ...(validatedData.descripcion !== undefined && { descripcion: validatedData.descripcion }),
        ...(validatedData.activo !== undefined && { activo: validatedData.activo }),
      },
    });
    
    const result = {
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion || "Sin descripción",
      activo: r.activo,
    };

    // Revalidar la página de profesion
    revalidatePath('/profesiones');
    revalidatePath(`/profesiones/${id}/edit`);
    
    return { success: true, data: result };
  } catch (error) {
    console.error(`Error al actualizar profesion con ID ${id}:`, error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Error desconocido al actualizar profesion" };
  }
}
