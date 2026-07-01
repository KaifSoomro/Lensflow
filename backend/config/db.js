import "dotenv/config";
import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then((res) => console.log("Connected to Database."))
      .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error.message)
  }
};

export default connectDB;