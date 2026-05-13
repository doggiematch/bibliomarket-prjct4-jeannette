import prisma from "../lib/prisma.js";

export const createReservation = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const buyerId = req.user.id;

    const book = await prisma.book.findUnique({ where: { id: bookId } });

    if (!book) {
      return res.status(404).json({ error: "No se ha encontrado el libro" });
    }

    if (book.status !== "AVAILABLE") {
      return res.status(400).json({ error: "El libro no está disponible" });
    }

    if (book.userId === buyerId) {
      return res
        .status(400)
        .json({ error: "No puedes reservar tu propio libro" });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);

    const reservation = await prisma.reservation.create({
      data: { bookId, buyerId, expiresAt },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: { status: "RESERVED" },
    });

    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
};
