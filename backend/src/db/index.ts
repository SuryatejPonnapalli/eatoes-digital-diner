import mongoose from "mongoose";
import { PrismaClient } from "../../generated/prisma";
import { SignupSchema } from "../models/user.model";

export const prisma = new PrismaClient({
  log: ["query"],
});

const connectDB = async () => {
  try {
    const mongoConnectionInstance = await mongoose.connect(
      `${process.env.MONGOOSE_URI}`
    );
    console.log("Connection successful");

    await prisma.$connect();
    console.log("Prisma connected to PostgreSQL");
  } catch (error) {
    console.log("Connection failed", error);
    process.exit(1);
  }
};
export default connectDB;
