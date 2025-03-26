import React, { useState } from 'react';
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

    try {
      if (mediaType === 'article' || mediaType === 'video') {
        const payload = {
          title,
          description,
          media_type: mediaType,
          media_link: uploadLink,
          course: courseName,
          summary: description
        };
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        await axios.post(`${API_BASE_URL}/resources`, payload);
        
      } else {
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('course', courseName);
        formData.append('summary', description);

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

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
      <a href="/" className="back-button">Back</a>

      {submitted ? (
        <SubmittedPage title={title} />
      ) : (
        <div className="content">
          <h1>Help Buddy Help You!</h1>
          <form onSubmit={handleSubmit} className="form-container">
            {error && <p className="error">{error}</p>}

            {/* Title */}
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

            {/* Media Type */}
            <div className="form-group-row">
              <label htmlFor="mediaType">Media Type:</label>
              <select
                id="mediaType"
                value={mediaType}
                onChange={(e) => {
                  setMediaType(e.target.value);
                  setUploadLink('');
                  setUploadFile(null);
                }}
              >
                <option value="" disabled>Select type</option>
                <option value="article">Article</option>
                <option value="video">YouTube Video</option>
                <option value="document">Document</option>
                <option value="image">Image</option>
              </select>
            </div>

            {/* Upload Field for Link */}
            {(mediaType === 'article' || mediaType === 'video') && (
              <div className="form-group-row">
                <label htmlFor="uploadLink">
                  {mediaType === 'article' ? 'Article URL:' : 'YouTube URL:'}
                </label>
                <input
                  type="text"
                  id="uploadLink"
                  placeholder={
                    mediaType === 'article'
                      ? 'E.g. https://towardsdatascience.com/...'
                      : 'E.g. https://www.youtube.com/watch?v=...'
                  }
                  
                  value={uploadLink}
                  onChange={(e) => setUploadLink(e.target.value)}
                />
              </div>
            )}

            {/* Upload Field for File */}
            {(mediaType === 'document' || mediaType === 'image') && (
              <div className="form-group-row">
                <label htmlFor="uploadFile">
                  {mediaType === 'document' ? 'Document:' : 'Image:'}
                </label>
                <input
                  type="file"
                  id="uploadFile"
                  accept={mediaType === 'document' ? ".pdf,.doc,.docx" : "image/*"}
                  onChange={handleFileChange}
                />
                {uploadFile && <p className="file-info">Selected: {uploadFile.name}</p>}
              </div>
            )}

            {/* Course */}
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

            {/* Description */}
            <div className="form-group-row">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g. This PDF gives a clear explanation of heaps..."
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
