import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.PROD_MONGO_URI}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MognoDB Error: , ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
