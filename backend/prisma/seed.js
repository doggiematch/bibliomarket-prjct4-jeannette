import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.reservation.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: "Ficción" },
      update: {},
      create: { name: "Ficción" },
    }),
    prisma.genre.upsert({
      where: { name: "Ciencia ficción" },
      update: {},
      create: { name: "Ciencia ficción" },
    }),
    prisma.genre.upsert({
      where: { name: "Historia" },
      update: {},
      create: { name: "Historia" },
    }),
    prisma.genre.upsert({
      where: { name: "Programación" },
      update: {},
      create: { name: "Programación" },
    }),
  ]);

  const adminPwd = await bcrypt.hash("admin123", 10);
  const userPwd = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bibliomarket.com" },
    update: {},
    create: {
      email: "admin@bibliomarket.com",
      password: adminPwd,
      name: "Admin",
      role: "ADMIN",
    },
  });

  const seller1 = await prisma.user.upsert({
    where: { email: "laura@example.com" },
    update: {},
    create: {
      email: "laura@example.com",
      password: userPwd,
      name: "Laura Vendedora",
      role: "USER",
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: "carlos@example.com" },
    update: {},
    create: {
      email: "carlos@example.com",
      password: userPwd,
      name: "Carlos Comprador",
      role: "USER",
    },
  });

  const book1 = await prisma.book.create({
    data: {
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: 8.5,
      condition: "BuenEstado",
      description:
        "Edición de bolsillo en buen estado, algunas anotaciones a lápiz en los primeros capítulos.",
      genreId: genres[0].id,
      userId: seller1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Dune",
      author: "Frank Herbert",
      price: 12.0,
      condition: "ComoNuevo",
      description:
        "Prácticamente nuevo, leído una sola vez. Sin marcas ni anotaciones.",
      genreId: genres[1].id,
      userId: seller1.id,
    },
  });

  await prisma.book.create({
    data: {
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 15.0,
      condition: "ConDefectos",
      description:
        "Portada con desgaste pero interior en perfecto estado. Imprescindible para cualquier programador.",
      genreId: genres[3].id,
      userId: admin.id,
    },
  });

  await prisma.reservation.create({
    data: {
      bookId: book1.id,
      buyerId: buyer.id,
      status: "PENDING",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  console.log("✅ Seed completed");
  console.log("👤 Admin:   admin@bibliomarket.com / admin123");
  console.log("👤 Seller:  laura@example.com / user123");
  console.log("👤 Buyer:   carlos@example.com / user123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
