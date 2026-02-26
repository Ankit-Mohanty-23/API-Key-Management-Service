import prisma from "./prisma.js";
import logger from "../utils/logger.js";

export async function connectDB() {
  try {
    await prisma.$connect();
    logger.info("✅ PostgreSQL connected via Prisma");
  } catch (error) {
    logger.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}