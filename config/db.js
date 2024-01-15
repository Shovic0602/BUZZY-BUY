import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database.....`);
  } catch (error) {
    console.log(error);
    // throw new Error(error);
  }
};

export default connectDB;
