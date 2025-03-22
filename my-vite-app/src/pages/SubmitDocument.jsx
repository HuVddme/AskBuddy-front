import React, { useState } from 'react'

const SubmitDocumentPage = () => {
  const [mediaType, setMediaType] = useState('article link')
  const [description, setDescription] = useState('')
  const [courseName, setCourseName] = useState('')
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle the form submission logic here
    console.log({ mediaType, description, courseName, title })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Submit Your Document</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div>
          <label>Media Type:</label>
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
            <option value="article link">Article Link</option>
            <option value="youtube link">YouTube Link</option>
            <option value="pdf doc">PDF Document</option>
            <option value="image">Image</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows="3" 
            placeholder="Describe the document..."
          />
        </div>
        <div>
          <label>Course Name:</label>
          <input 
            type="text" 
            value={courseName} 
            onChange={(e) => setCourseName(e.target.value)} 
            placeholder="Enter the course name"
          />
        </div>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter the title of your upload"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SubmitDocumentPage
