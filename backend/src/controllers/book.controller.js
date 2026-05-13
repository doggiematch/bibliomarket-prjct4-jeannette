import prisma from "../lib/prisma.js";

const include = {
  genre: true,
  user: { select: { id: true, name: true, email: true } },
  _count: { select: { reservations: true } },
};

const conditionValues = {
  "COMO NUEVO": "ComoNuevo",
  "BUEN ESTADO": "BuenEstado",
  ACEPTABLE: "Aceptable",
  "CON DEFECTOS": "ConDefectos",
  "Como nuevo": "ComoNuevo",
  "Buen estado": "BuenEstado",
  Aceptable: "Aceptable",
  "Con defectos": "ConDefectos",
  ComoNuevo: "ComoNuevo",
  BuenEstado: "BuenEstado",
  ConDefectos: "ConDefectos",
  LIKE_NEW: "ComoNuevo",
  GOOD: "BuenEstado",
  ACCEPTABLE: "Aceptable",
  POOR: "ConDefectos",
};

export const getBooks = async (req, res, next) => {
  try {
    const { genreId, minPrice, maxPrice, condition } = req.query;
    const where = { status: "AVAILABLE" };

    if (genreId) where.genreId = Number(genreId);
    if (condition) where.condition = conditionValues[condition] || condition;
    if (minPrice)
      where.price = { ...(where.price || {}), gte: Number(minPrice) };
    if (maxPrice)
      where.price = { ...(where.price || {}), lte: Number(maxPrice) };

    const books = await prisma.book.findMany({
      where,
      include,
      orderBy: { createdAt: "desc" },
    });
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await prisma.book.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
      include,
    });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const book = await prisma.book.create({
      data: { ...req.body, userId: req.user.id },
      include,
    });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await prisma.book.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
    });

    if (book.userId !== req.user.id && req.user.role !== "ADMIN") {
      const error = new Error("No tienes permiso para editar este libro");
      error.statusCode = 403;
      return next(error);
    }

    const updated = await prisma.book.update({
      where: { id: book.id },
      data: req.body,
      include,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await prisma.book.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
    });

    if (book.userId !== req.user.id && req.user.role !== "ADMIN") {
      const error = new Error("No tienes permiso para eliminar este libro");
      error.statusCode = 403;
      return next(error);
    }

    await prisma.book.update({
      where: { id: book.id },
      data: { status: "CANCELLED" },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
