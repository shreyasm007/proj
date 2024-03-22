// pushDataToMongoDB.js

const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB connection URI
const uri = "mongodb+srv://Shreyas:shreyas111@shreyasdb.yfjyuw0.mongodb.net/json_entries?retryWrites=true&w=majority";

// Function to read the JSON file
const readJSONFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading JSON file:", error);
        throw error;
    }
}

// Function to push data to MongoDB
const pushDataToMongoDB = async () => {
    let client; // Declare the client variable outside the try block
    try {
        // Create a MongoDB client
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB successfully!");

        // Read data from JSON file
        const jsonData = readJSONFile('./output_json_file.json'); // Update the file path if necessary

        // Select database and collection
        const db = client.db("json_entries"); // Replace json_entries with your database name
        const collection = db.collection("trial");

        // Insert data into MongoDB collection
        await collection.insertMany(jsonData);
        
        console.log("Data inserted into MongoDB successfully!");
    } catch (error) {
        console.error("Error pushing data to MongoDB:", error);
    } finally {
        // Close the MongoDB connection
        if (client) {
            await client.close();
            console.log("MongoDB connection closed.");
        }
    }
}

// Call the function to push data to MongoDB
pushDataToMongoDB();
