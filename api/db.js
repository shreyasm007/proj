// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/json_entries";
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    return client.db("json_entries");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToMongoDB };
