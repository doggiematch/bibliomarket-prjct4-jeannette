import { Router } from "express";
import {
  getBooks,
  getBookById,
  getMyBooks,
  createBook,
  updateBook,
  reactivateBook,
  deleteBook,
  permanentlyDeleteBook,
} from "../controllers/book.controller.js";
import { optionalAuth, verifyToken } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { createBookSchema, updateBookSchema } from "../schemas/book.schema.js";

const router = Router();

router.get("/", optionalAuth, getBooks);
router.get("/mine", verifyToken, getMyBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken, validate(createBookSchema), createBook);
router.put("/:id", verifyToken, validate(updateBookSchema), updateBook);
router.patch("/:id/reactivate", verifyToken, reactivateBook);
router.delete("/:id/permanent", verifyToken, permanentlyDeleteBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;
