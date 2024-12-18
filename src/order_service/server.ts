import { ExpressApp } from "expressApp";
import { logger } from "~src/utils/logger";
import { initializeDataSources } from "~src/config/dataSourceInitializer";

const PORT = process.env.APP_PORT || 9002;

export const StartServer = async () => {

   try {
    await initializeDataSources();
    console.log("All data sources initialized successfully!");
    } catch (err) {
    console.error("Error initializing data sources:", err);
    throw err;
    }

  const expressApp = await ExpressApp();
  expressApp.listen(PORT, () => {
    logger.info(`App is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("server is up");
});