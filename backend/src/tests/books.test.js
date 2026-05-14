import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import prisma from "../lib/prisma.js";
import app from "../app.js";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-key";

beforeAll(async () => {
  await prisma.reservation.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.reservation.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe("GET /api/books", () => {
  it("returns a list of available books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("returns 200 with genre and user data", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("genre");
      expect(res.body[0]).toHaveProperty("user");
    }
  });
});

describe("GET /api/books/:id", () => {
  it("returns 404 for a non-existent book", async () => {
    const res = await request(app).get("/api/books/99999");
    expect(res.status).toBe(404);
  });
});

describe("POST /api/books", () => {
  it("returns 401 without token", async () => {
    const res = await request(app).post("/api/books").send({
      title: "Test Book",
      author: "Test Author",
      description: "Test description",
      price: 10.99,
      condition: "BuenEstado",
      genreId: 1,
    });

    expect(res.status).toBe(401);
  });
});
