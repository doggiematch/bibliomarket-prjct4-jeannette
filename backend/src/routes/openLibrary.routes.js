import { Router } from "express";
import { searchOpenLibraryBooks } from "../controllers/openLibrary.controller.js";

const router = Router();

router.get("/search", searchOpenLibraryBooks);

export default router;
