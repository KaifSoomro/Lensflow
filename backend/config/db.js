import "dotenv/config";
import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Database."))
    .catch((error) => console.log(error.message));
};

export default connectDB;
