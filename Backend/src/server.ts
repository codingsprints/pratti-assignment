import app from './app';
import { configENV } from './common/config/config';
import logger from './common/config/logger';
import connectDB from './common/database/DB';

const startServer = async () => {
  const PORT = configENV.port;
  try {
    logger.info('🚀 Starting application...');
    connectDB();
    logger.info('🗂️  Database connected successfully!');
    app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message);
      logger.on('finish', () => {
        process.exit(1);
      });
    }
  }
};

startServer();
