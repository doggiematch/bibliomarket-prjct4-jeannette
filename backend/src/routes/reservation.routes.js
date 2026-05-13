import { Router } from "express";
import { createReservation } from "../controllers/reservation.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { createReservationSchema } from "../schemas/reservation.schema.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validate(createReservationSchema),
  createReservation,
);

export default router;
