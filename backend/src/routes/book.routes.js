import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { createBookSchema, updateBookSchema } from "../schemas/book.schema.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken, validate(createBookSchema), createBook);
router.put("/:id", verifyToken, validate(updateBookSchema), updateBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;
