import mongoose from 'mongoose';
import logger from '../helper/logger.js';

const connectDB = async (): Promise<void> => {
   try {
      const uri = process.env.MONGO_URI as string;
      if (!uri) throw new Error('MONGO_URI is not defined');

      await mongoose.connect(uri, { autoIndex: true });
      logger.info('MongoDB connected ✅');
   } catch (err) {
      logger.info('MongoDB connection error ❌', err);
      process.exit(1);
   }
};

export default connectDB;
