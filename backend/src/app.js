import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bibliomarket funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use(errorHandler);

export default app;
