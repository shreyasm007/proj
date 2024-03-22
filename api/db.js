// db.js

const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb://localhost:27017/json_entries";

// Create a MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        return client.db("json_entries"); // Replace <dbname> with your database name
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = { connectToMongoDB };
