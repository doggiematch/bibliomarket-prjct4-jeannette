import { Router } from "express";
import {
  createReservation,
  deleteReservation,
  getMyReservations,
} from "../controllers/reservation.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { createReservationSchema } from "../schemas/reservation.schema.js";

const router = Router();

router.get("/mine", verifyToken, getMyReservations);
router.post(
  "/",
  verifyToken,
  validate(createReservationSchema),
  createReservation,
);
router.delete("/:id", verifyToken, deleteReservation);

export default router;
