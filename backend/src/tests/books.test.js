import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

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
