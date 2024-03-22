///////THE OLD CODE WHICH WAS USING STATIC JSON IN API FOLDER
// const express = require('express');
// const app = express();
// const port = 3001;
// const cors=require('cors')
// app.use(cors());
// // Use the generated JSON file
// const licensingData = require('./output_json_file.json');
// app.get('/licensing-data', (req, res) => {
//   res.json(licensingData);
// });
// app.listen(port, () => {
// console.log(`Server is running at http://localhost:${port}`);
// });



// index.js
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const { connectToMongoDB } = require('./db'); // Import the MongoDB connection function
app.use(cors());
// Handle GET request to retrieve licensing data from MongoDB
app.get('/licensing-data', async (req, res) => {
    try {
        // Connect to MongoDB
        const db = await connectToMongoDB();
        
        // Retrieve licensing data from MongoDB collection (replace 'collectionName' with your collection name)
        const licensingData = await db.collection('trial').find({}).toArray();
        
        res.json(licensingData);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello from Server !");
});