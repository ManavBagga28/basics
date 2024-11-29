import expressApp from './expressApp'
import { logger } from './utils/logger';
import { initializeDataSources } from './config/dataSourceInitializer';

const PORT = process.env.APP_PORT || 8000;

export const StartServer = async () => {

  try {
    await initializeDataSources();
    console.log("All data sources initialized successfully!");
  } catch (err) {
    console.error("Error initializing data sources:", err);
    throw err;
  }
  
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