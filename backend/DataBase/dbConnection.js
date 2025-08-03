const mongoose = require("mongoose");

const dbConnection = () => {
    const uri = process.env.MONGO_URI;
   if (!uri) {
    console.error("❌ MONGO_URL is undefined. Check your .env file.");
    return;
  }

  mongoose.connect(uri, {
    dbName: "WellNess_Assessment",
  })
  .then(() => {
    console.log(" Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
}

module.exports = {dbConnection};