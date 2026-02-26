import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";
//import globalErrorHandler from "../src/middleware/error.middleware.js";
//import { notFound } from "../src/middleware/notFound.middleware.js";

const app = express();

//Midlewares
app.use(cors());
app.use(express.json());
app.use(
    morgan("dev", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

//Routes
app.get("/ready", (req, res) => {
    res.status(200).json({
        success: true,
        message: "SmartQ API running",
    });
});

// user routes

//app.use(notFound());
//app.use(globalErrorHandler());

export default app;