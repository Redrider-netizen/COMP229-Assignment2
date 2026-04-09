const path = require("path");
const mongoose = require(path.resolve(__dirname, "../../node_modules/mongoose"));

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb+srv://portfolioUser:StrongPassword123@cluster0.ek7cqla.mongodb.net/?appName=Cluster0";

  const connection = await mongoose.connect(uri, {
    dbName: "portfolio",
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`MongoDB Connected: ${connection.connection.host}/${connection.connection.name}`);
  return connection;
};

module.exports = connectDB;
