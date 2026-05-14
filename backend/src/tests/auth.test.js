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

describe("POST /api/auth/register", () => {
  it("registers a user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "user123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("testuser@example.com");
  });

  it("returns 409 for duplicate email", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Duplicate User",
      email: "duplicate@example.com",
      password: "user123",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Duplicate User Again",
      email: "duplicate@example.com",
      password: "user123",
    });

    expect(res.status).toBe(409);
  });
});

describe("POST /api/auth/login", () => {
  it("returns token with valid credentials", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email: "login@example.com",
      password: "user123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "user123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("POST /api/reservations", () => {
  it("returns 401 without token", async () => {
    const res = await request(app).post("/api/reservations").send({
      bookId: 1,
    });

    expect(res.status).toBe(401);
  });
});
