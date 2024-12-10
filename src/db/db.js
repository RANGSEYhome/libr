const mongoose = require("mongoose");

const dbName = process.env.DB_NAME;
const dbCotainer = "mongodb";
// Test editing
// MongoDB connection URI
const mongoURI = `mongodb://${dbCotainer}:27017`;

async function dbConnect() {
  mongoose.connection.on("connected", () => {
    console.log("Connected: ", dbName);
  });
  // Connect to MongoDB
  await mongoose.connect(mongoURI, {
    dbName: dbName,
  });
}

// Change 'mongodb' to the service name
// const mongoUri = `mongodb://mongodb:27017/${dbName}`;
// async function dbConnect() {
//     try {
//         await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('MongoDB connected successfully');
//     } catch (err) {
//         console.error('MongoDB connection error:', err);
//     }
// }

module.exports = dbConnect;
