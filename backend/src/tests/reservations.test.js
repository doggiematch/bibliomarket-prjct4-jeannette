import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import app from "../app.js";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-key";

let sellerToken;
let buyerToken;
let bookId;
let genreId;

beforeAll(async () => {
  await prisma.reservation.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const seller = await prisma.user.create({
    data: {
      name: "Seller Test",
      email: "seller@test.com",
      password: "hashedpassword",
      role: "USER",
    },
  });

  const buyer = await prisma.user.create({
    data: {
      name: "Buyer Test",
      email: "buyer@test.com",
      password: "hashedpassword",
      role: "USER",
    },
  });

  sellerToken = jwt.sign(
    { id: seller.id, email: seller.email, role: seller.role },
    process.env.JWT_SECRET,
  );

  buyerToken = jwt.sign(
    { id: buyer.id, email: buyer.email, role: buyer.role },
    process.env.JWT_SECRET,
  );

  const genre = await prisma.genre.create({
    data: { name: "Test Genre" },
  });

  genreId = genre.id;

  const book = await prisma.book.create({
    data: {
      title: "Test Book",
      author: "Test Author",
      description: "Test description",
      price: 12.5,
      condition: "BuenEstado",
      status: "AVAILABLE",
      genreId,
      userId: seller.id,
    },
  });

  bookId = book.id;
});

afterAll(async () => {
  await prisma.reservation.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe("POST /api/reservations", () => {
  it("creates a reservation successfully", async () => {
    const res = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send({ bookId });

    expect(res.status).toBe(201);
    expect(res.body.bookId).toBe(bookId);

    const updatedBook = await prisma.book.findUnique({
      where: { id: bookId },
    });

    expect(updatedBook.status).toBe("RESERVED");
  });
});

it("does not allow reserving a book that is not available", async () => {
  const unavailableBook = await prisma.book.create({
    data: {
      title: "Unavailable Book",
      author: "Test Author",
      description: "Unavailable book description",
      price: 18,
      condition: "BuenEstado",
      status: "RESERVED",
      genreId,
      userId: jwt.verify(sellerToken, process.env.JWT_SECRET).id,
    },
  });

  const res = await request(app)
    .post("/api/reservations")
    .set("Authorization", `Bearer ${buyerToken}`)
    .send({ bookId: unavailableBook.id });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe("El libro no está disponible");
});
