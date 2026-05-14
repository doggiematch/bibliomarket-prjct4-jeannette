import prisma from "../lib/prisma.js";

const include = {
  book: {
    include: {
      genre: true,
      user: { select: { id: true, name: true, email: true } },
    },
  },
};

export const getMyFavorites = async (req, res, next) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include,
      orderBy: { createdAt: "desc" },
    });

    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const bookId = Number(req.params.bookId);
    const book = await prisma.book.findUnique({ where: { id: bookId } });

    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    const favorite = await prisma.favorite.upsert({
      where: { bookId_userId: { bookId, userId: req.user.id } },
      update: {},
      create: { bookId, userId: req.user.id },
      include,
    });

    res.status(201).json(favorite);
  } catch (err) {
    next(err);
  }
};

export const deleteFavorite = async (req, res, next) => {
  try {
    await prisma.favorite.delete({
      where: {
        bookId_userId: {
          bookId: Number(req.params.bookId),
          userId: req.user.id,
        },
      },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
