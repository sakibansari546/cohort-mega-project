import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connect with host", con.connections[0].host);
  } catch (error) {
    console.log("Error - MongoDB connect faild", error);
    process.exit(1);
  }
};

export default connectDB;
