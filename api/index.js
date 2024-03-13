const express = require('express');
const app = express();
const port = 3001;
const cors=require('cors')
app.use(cors());
// Use the generated JSON file
const licensingData = require('./output_json_file.json');
 
app.get('/licensing-data', (req, res) => {
  res.json(licensingData);
});
 
app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}`);
});