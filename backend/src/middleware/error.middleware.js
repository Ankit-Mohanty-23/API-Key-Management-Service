import AppError from "../util/AppError.js";
import multer from "multer";
import logger from "../util/logger.js";
import { Prisma } from "@prisma/client";

export default function globalErrorHandler(err, req, res, next) {

    let error = err;

    // Prisma unique constraint
    if (error instanceof Prisma.PrismaClientKnownRequestError) {

        if (error.code === "P2002") {
            const field = error.meta?.target?.[0] || "Field";
            error = new AppError(`${field} already exists`, 409);
        }

        if (error.code === "P2025") {
            error = new AppError("Resource not found", 404);
        }

    }

    // Prisma validation error
    if (error instanceof Prisma.PrismaClientValidationError) {
        error = new AppError("Invalid input data", 400);
    }

    // JWT errors
    if (error.name === "JsonWebTokenError") {
        error = new AppError("Invalid token", 401);
    }

    if (error.name === "TokenExpiredError") {
        error = new AppError("Token expired", 401);
    }

    // Multer errors
    if (error instanceof multer.MulterError) {
        error = new AppError(error.message, 400);
    }

    // Email service errors
    if (error.code === "EAUTH" || error.code === "ECONNECTION") {
        error = new AppError("Email service unavailable", 502);
    }

    // Logger
    logger.error("API Error", {

        message: error.message,
        statusCode: error.statusCode || 500,

        method: req.method,
        url: req.originalUrl,
        path: req.path,

        userId: req.user?.id || null,

        stack: error.stack,
        metadata: error.metadata || null,
    });

    res.status(error.statusCode || 500).json({

        success: false,

        message:
            error.isOperational
                ? error.message
                : "Internal Server Error"

    });

}