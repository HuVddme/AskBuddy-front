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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!mediaType || !description || !courseName || !title) {
      setError('Please fill out all fields.');
      return;
    }
  
    if ((mediaType === 'article' || mediaType === 'video') && !uploadLink) {
      setError('Please provide a link.');
      return;
    }
  
    if ((mediaType === 'document' || mediaType === 'image') && !uploadFile) {
      setError('Please upload a file.');
      return;
    }
  
    setError('');
  
    // ✅ If it's an article or video (no file involved)
    if (mediaType === 'article' || mediaType === 'video') {
      const payload = {
        title,
        description,
        media_type: mediaType,
        media_link: uploadLink,
        course: courseName,
        summary: description
      };
  
      try {
        const response = await axios.post('http://0.0.0.0:8000/resources', payload);
        console.log('Submitted article/video:', response.data);
        setSubmitted(true);
      } catch (err) {
        console.error('Submission failed:', err);
        setError('Submission failed. Please try again.');
      }
  
      return;
    }
  
    // ✅ Else: document or image file upload
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('course', courseName);
    formData.append('summary', description);
  
    try {
      const uploadRes = await axios.post(
        'http://0.0.0.0:8000/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Submitted document/image:', uploadRes.data);
      setSubmitted(true);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('File upload failed. Please try again.');
    }
  };
  
  

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  return (
    <div className="page-container">
      {/* Back button to go to the home page */}
      <a href="/" className="back-button">Back</a>

      {submitted ? (
        <SubmittedPage title={title} />
      ) : (
        <div className="content">
          <h1>Help Buddy Help You!</h1>
          <form onSubmit={handleSubmit} className="form-container">
            {error && <p className="error">{error}</p>}

              {/* Title row */}
              <div className="form-group-row">
                <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                   placeholder="E.g. Heaps"
                 />
             </div>

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
                <option value="article">Article</option>
                <option value="video">YouTube URL</option>
                <option value="document">Document</option>
                <option value="image">Picture</option>
              </select>
            </div>

            {/* Conditional Upload Field */}
            {(mediaType === 'article link' || mediaType === 'youtube link') && (
              <div className="form-group-row">
                <label htmlFor="uploadLink">Link:</label>
                <input
                  type="text"
                  id="uploadLink"
                  placeholder="E.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={uploadLink}
                  onChange={(e) => setUploadLink(e.target.value)}
                />
              </div>
            )}

            {(mediaType === 'document' || mediaType === 'image') && (
              <div className="form-group-row">
                <label htmlFor="uploadFile">File:</label>
                <input
                  type="file"
                  id="uploadFile"
                  accept={mediaType === 'document' ? ".pdf" : "image/*"}
                  onChange={handleFileChange}
                />
                {uploadFile && <p className="file-info">Selected: {uploadFile.name}</p>}
              </div>
            )}

            {/* Course Name row */}
            <div className="form-group-row">
              <label htmlFor="courseName">Course Name:</label>
                <input
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="E.g. Intro to Computer Science"
                />
            </div>

            {/* Description row */}
            <div className="form-group-row">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g. This PDF gives a clear and simple explanation of heaps, including how Min-Heaps and Max-Heaps work."
                rows={4}
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
