import app from "./src/app.js";
import { env } from "./src/config/env.js";
import logger from "./src/utils/logger.js";
import { connectDB } from "./src/config/db.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(`❌ Database connection failed: ${error?.message ?? String(error)}`);
    if (error?.stack) logger.error(error.stack);
  }
};

startServer();
