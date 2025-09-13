import mongoose from 'mongoose';
import { configENV } from '../config/config';
import logger from '../config/logger';

const connectDB = async () => {
  try {
    await mongoose.connect(configENV.database_url);
    logger.info('✅ MongoDB connected successfully');
  } catch (error) {
    if (error instanceof Error) {
      logger.info('❌ Error connecting to MongoDB:', error.message);
    } else {
      logger.info('Unknown error connecting to MongoDB');
    }
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
