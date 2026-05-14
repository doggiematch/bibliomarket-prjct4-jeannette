import { Router } from "express";
import {
  addFavorite,
  deleteFavorite,
  getMyFavorites,
} from "../controllers/favorite.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.get("/mine", verifyToken, getMyFavorites);
router.post("/:bookId", verifyToken, addFavorite);
router.delete("/:bookId", verifyToken, deleteFavorite);

export default router;
