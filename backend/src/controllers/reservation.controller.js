import prisma from "../lib/prisma.js";

const include = {
  book: {
    include: {
      genre: true,
      user: { select: { id: true, name: true, email: true } },
    },
  },
};

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

export const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { buyerId: req.user.id },
      include,
      orderBy: { createdAt: "desc" },
    });

    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!reservation) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (reservation.buyerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "No tienes permiso" });
    }

    await prisma.$transaction([
      prisma.reservation.delete({ where: { id: reservation.id } }),
      prisma.book.update({
        where: { id: reservation.bookId },
        data: { status: "AVAILABLE" },
      }),
    ]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
