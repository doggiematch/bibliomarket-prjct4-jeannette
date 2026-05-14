import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(5, "El titulo debe tener al menos 5 caracteres"),
  author: z.string().min(2, "El autor debe tener al menos 2 caracteres"),
  price: z.number().positive("El precio debe ser un numero positivo"),
  condition: z.enum(["ComoNuevo", "BuenEstado", "Aceptable", "ConDefectos"], {
    errorMap: () => ({ message: "Condicion no valida" }),
  }),
  genreId: z.number().int().positive("El genero es obligatorio"),
  description: z
    .string()
    .min(5, "La descripcion del ejemplar debe tener al menos 5 caracteres"),
  language: z.string().min(2, "El idioma es obligatorio"),
  synopsis: z.string().min(10, "La sinopsis debe tener al menos 10 caracteres"),
  isbn: z.string().optional(),
  coverUrl: z.string().url("La URL de la portada no es valida").optional(),
  year: z.number().int().min(1000).max(new Date().getFullYear()).optional(),
});

export const updateBookSchema = createBookSchema.partial();
