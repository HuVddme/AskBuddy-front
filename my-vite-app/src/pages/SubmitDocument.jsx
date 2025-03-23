import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import "../styles/SubmitDocument.css";
import axios from 'axios';
import SubmittedPage from './SubmittedPage';

const SubmitDocumentPage = () => {
  const [mediaType, setMediaType] = useState('');
  const [description, setDescription] = useState('');
  const [courseName, setCourseName] = useState('');
  const [title, setTitle] = useState('');
  const [uploadLink, setUploadLink] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Capture window size for Confetti
  const { width, height } = useWindowSize();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!mediaType || !description || !courseName || !title) {
      setError('Please fill out all fields.');
      return;
    }
  
    // Validate link or file based on mediaType
    if (
      (mediaType === 'article link' || mediaType === 'youtube link') && !uploadLink
    ) {
      setError('Please provide a link.');
      return;
    }
  
    if (
      (mediaType === 'pdf doc' || mediaType === 'image') && !uploadFile
    ) {
      setError('Please upload a file.');
      return;
    }
  
    setError('');
  
    // Format media_type and media_link
    const mediaTypeFormatted = mediaType.includes('youtube')
      ? 'youtube'
      : mediaType.includes('article')
      ? 'article'
      : mediaType.includes('pdf')
      ? 'pdf'
      : 'image';
  
    const mediaLink = uploadLink || 'uploaded_file_placeholder.pdf'; // Replace if handling files later
  
    const payload = {
      title,
      description,
      media_type: mediaTypeFormatted,
      media_link: mediaLink,
      course: courseName,
      summary: "Explains supervised vs unsupervised learning with visual examples."
    };
  
    try {
      const response = await axios.post('http://0.0.0.0:8000/resources', payload); // replace with your actual backend URL

      console.log('Submission successful:', response.data);
      setSubmitted(true);
  
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Submission failed. Please try again.');
    }
  };
  
  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  return (
    <div className="page-container">
      {submitted ? (
        <SubmittedPage title={title} />
      ) : (
        <div className="content">
          <h1>Submit Your Document</h1>
          <form onSubmit={handleSubmit} className="form-container">
            {error && <p className="error">{error}</p>}

            {/* Media Type Row */}
            <div className="form-group-row">
              <label htmlFor="mediaType">Media Type:</label>
              <select
                id="mediaType"
                value={mediaType}
                onChange={(e) => {
                  setMediaType(e.target.value);
                  // Clear any previously entered upload info when media type changes
                  setUploadLink('');
                  setUploadFile(null);
                }}
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="article link">Article Link</option>
                <option value="youtube link">YouTube Link</option>
                <option value="pdf doc">PDF Document</option>
                <option value="image">Image</option>
              </select>
            </div>

            {/* Conditional Upload Field */}
            {(mediaType === 'article link' || mediaType === 'youtube link') && (
              <div className="form-group-row">
                <label htmlFor="uploadLink">Link:</label>
                <input
                  type="text"
                  id="uploadLink"
                  placeholder="Paste your link here"
                  value={uploadLink}
                  onChange={(e) => setUploadLink(e.target.value)}
                />
              </div>
            )}

            {(mediaType === 'pdf doc' || mediaType === 'image') && (
              <div className="form-group-row">
                <label htmlFor="uploadFile">File:</label>
                <input
                  type="file"
                  id="uploadFile"
                  accept={mediaType === 'pdf doc' ? ".pdf" : "image/*"}
                  onChange={handleFileChange}
                />
                {uploadFile && <p className="file-info">Selected: {uploadFile.name}</p>}
              </div>
            )}

            {/* Description row */}
            <div className="form-group-row">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="summary of upload"
                rows={4}
              />
            </div>

            {/* Course Name row */}
            <div className="form-group-row">
              <label htmlFor="courseName">Course Name:</label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
              />
            </div>

            {/* Title row */}
            <div className="form-group-row">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubmitDocumentPage;