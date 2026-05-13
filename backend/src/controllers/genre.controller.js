import prisma from "../lib/prisma.js";

export const getGenres = async (req, res, next) => {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: { name: "asc" },
    });

    res.json(genres);
  } catch (err) {
    next(err);
  }
};
