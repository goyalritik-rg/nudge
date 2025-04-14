import { PrismaClient } from "@prisma/client";

export const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}
