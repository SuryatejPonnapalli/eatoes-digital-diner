import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoConnectionInstance = await mongoose.connect(
      `${process.env.MONGOOSE_URI}/eatoes-menu`
    );
    console.log("Connection successful");
  } catch (error) {
    console.log("Connection failed");
    process.exit(1);
  }
};
export default connectDB;
