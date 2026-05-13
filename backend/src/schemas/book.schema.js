import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  author: z.string().min(2, "El autor debe tener al menos 2 caracteres"),
  price: z.number().positive("El precio debe ser un número positivo"),
  condition: z.enum(["ComoNuevo", "BuenEstado", "Aceptable", "ConDefectos"], {
    errorMap: () => ({ message: "Condición no válida" }),
  }),
  genreId: z.number().int().positive("El género es obligatorio"),
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres"),
  isbn: z.string().optional(),
  coverUrl: z.string().url("La URL de la portada no es válida").optional(),
  year: z.number().int().min(1000).max(new Date().getFullYear()).optional(),
});

export const updateBookSchema = createBookSchema.partial();
