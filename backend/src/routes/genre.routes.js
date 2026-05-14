import { Router } from "express";
import { getGenres } from "../controllers/genre.controller.js";

const router = Router();

router.get("/", getGenres);

export default router;
