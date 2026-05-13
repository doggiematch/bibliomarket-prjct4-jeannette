import { z } from "zod";

export const createReservationSchema = z.object({
  bookId: z.number().int().positive("Book ID is required"),
});
