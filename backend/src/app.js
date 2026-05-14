import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import genreRoutes from "./routes/genre.routes.js";
import openLibraryRoutes from "./routes/openLibrary.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bibliomarket API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/open-library", openLibraryRoutes);
app.use("/api/reservations", reservationRoutes);

app.use(errorHandler);

export default app;
