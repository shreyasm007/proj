import React, { useState } from 'react';
import axios from 'axios';
import './UploadExcelFile.css'; // Import CSS file for styling

const UploadExcelFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      setUploading(true); // Set uploading state to true when starting upload

      try {
        const response = await axios.post('http://localhost:3001/upload-excel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File uploaded successfully:', response.data);
        setUploadStatus('File uploaded successfully.');
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Error uploading file. Please try again.');
      }

      setUploading(false); // Set uploading state to false after upload completes
      setSelectedFile(null); // Clear the selected file after upload
    } else {
      console.error('Please select a file to upload.');
      setUploadStatus('Please select a file to upload.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Excel File</h2>
      <input type="file" onChange={handleFileChange} className="upload-input" />
      <button onClick={handleFileUpload} className="upload-btn" disabled={uploading}>
        Upload
      </button>
      {uploading && <div className="loading-spinner">Uploading...</div>}
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      {selectedFile && <p className="selected-file">Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default UploadExcelFile;
