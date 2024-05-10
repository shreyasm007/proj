const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx'); // Import the xlsx library for Excel file processing
const { connectToMongoDB } = require('./db');
app.use(cors());

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle POST request to upload Excel file
app.post('/upload-excel', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Convert buffer to workbook
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });

    // Extract data from the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Connect to MongoDB
    const db = await connectToMongoDB();

    // Insert JSON data into MongoDB collection
    const result = await db.collection('excel_data').insertMany(jsonData);

    res.status(200).json({ message: 'File uploaded successfully.', insertedCount: result.insertedCount });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred while uploading the file.' });
  }
});

// Handle GET request to retrieve licensing data from MongoDB
app.get('/licensing-data', async (req, res) => {
    try {
        // Connect to MongoDB
        const db = await connectToMongoDB();
        
        // Retrieve licensing data from MongoDB collection (replace 'collectionName' with your collection name)
        const licensingData = await db.collection('excel_data').find({}).toArray();
        
        res.json(licensingData);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handle DELETE request to clear data from MongoDB collection
app.delete('/clear-data', async (req, res) => {
    try {
        // Connect to MongoDB
        const db = await connectToMongoDB();
        
        // Clear the collection
        await db.collection('excel_data').deleteMany({});

        res.status(200).json({ message: 'Data cleared successfully.' });
    } catch (error) {
        console.error("Error clearing data from MongoDB:", error);
        res.status(500).json({ error: "An error occurred while clearing data." });
    }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
