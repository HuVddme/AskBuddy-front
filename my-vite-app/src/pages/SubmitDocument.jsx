// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '/Users/valentine/AskBuddy/AskBuddy-front/my-vite-app/src/styles/SubmitDocument.css';
// import Confetti from 'react-confetti';
// import { useWindowSize } from 'react-use';



// // const SubmitDocumentPage = () => {
// //   const [mediaType, setMediaType] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [courseName, setCourseName] = useState('');
// //   const [title, setTitle] = useState('');
// //   const [error, setError] = useState('');
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Validate fields: if any field is empty, show error
// //     if (!mediaType || !description || !courseName || !title) {
// //       setError('Please fill out all fields.');
// //       return;
// //     }
// //     // If valid, clear error and show submission message/confetti
// //     setError('');
// //     setSubmitted(true);
// //     console.log({ mediaType, description, courseName, title });
// //     // Optionally reset form fields after submission (with a delay if desired)
// //     setTimeout(() => {
// //       setSubmitted(false);
// //       setMediaType('');
// //       setDescription('');
// //       setCourseName('');
// //       setTitle('');
// //     }, 5000);
// //   };

// //   return (
// //     <div className="page-container">
// //       <div className="content">
// //         <h1>Submit Your Document</h1>
// //         <form onSubmit={handleSubmit} className="form-container">
// //           <div className="form-group">
// //             <label htmlFor="mediaType">Media Type:</label>
// //             <select
// //               id="mediaType"
// //               value={mediaType}
// //               onChange={(e) => setMediaType(e.target.value)}
// //             >
// //               <option value="" disabled>
// //                 Select type
// //               </option>
// //               <option value="article link">Article Link</option>
// //               <option value="youtube link">YouTube Link</option>
// //               <option value="pdf doc">PDF Document</option>
// //               <option value="image">Image</option>
// //             </select>
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="description">Description:</label>
// //             <input
// //               type="text"
// //               id="description"
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               placeholder="Enter description"
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="courseName">Course Name:</label>
// //             <input
// //               type="text"
// //               id="courseName"
// //               value={courseName}
// //               onChange={(e) => setCourseName(e.target.value)}
// //               placeholder="Enter course name"
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="title">Title:</label>
// //             <input
// //               type="text"
// //               id="title"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               placeholder="Enter title"
// //             />
// //           </div>
// //           {error && <p className="error">{error}</p>}
// //           <button type="submit">Submit</button>
// //         </form>
// //         {submitted && (
// //           <div className="success-message">
// //             <p>Your upload has been submitted!</p>
// //             <div className="confetti">
// //               {/* Replace with a confetti component/animation as needed */}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SubmitDocumentPage;
// const SubmitDocumentPage = () => {
//   const [mediaType, setMediaType] = useState('');
//   const [description, setDescription] = useState('');
//   const [courseName, setCourseName] = useState('');
//   const [title, setTitle] = useState('');
//   const [error, setError] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   // Capture window size for confetti
//   const { width, height } = useWindowSize();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validate fields: if any field is empty, show error
//     if (!mediaType || !description || !courseName || !title) {
//       setError('Please fill out all fields.');
//       return;
//     }

//     // Clear error and show submission message/confetti
//     setError('');
//     setSubmitted(true);
//     console.log({ mediaType, description, courseName, title });

//     // Optionally reset form fields after a delay
//     setTimeout(() => {
//       setSubmitted(false);
//       setMediaType('');
//       setDescription('');
//       setCourseName('');
//       setTitle('');
//     }, 5000);
//   };

//   return (
//     <div className="page-container">
//       {submitted && (
//         <>
//           <Confetti width={width} height={height} />
//           <div className="submission-popup">
//             <p>Your upload has been submitted!</p>
//           </div>
//         </>
//       )}

//       {/* Optional Navbar 
//       <nav className="navbar">
//         <Link to="/">Landing</Link>
//         <Link to="/submit">Submit Document</Link>
//         <Link to="/ask">Ask a Question</Link>
//       </nav>
//       */}

//       <div className="content">
//         <h1>Submit Your Document</h1>

//         <form onSubmit={handleSubmit} className="form-container">
//           {error && <p className="error">{error}</p>}

//           <div className="form-group">
//             <label htmlFor="mediaType">Media Type:</label>
//             <select
//               id="mediaType"
//               value={mediaType}
//               onChange={(e) => setMediaType(e.target.value)}
//             >
//               <option value="" disabled>
//                 Select type
//               </option>
//               <option value="article link">Article Link</option>
//               <option value="youtube link">YouTube Link</option>
//               <option value="pdf doc">PDF Document</option>
//               <option value="image">Image</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter description"
//               rows={8}  // Large text box
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="courseName">Course Name:</label>
//             <input
//               type="text"
//               id="courseName"
//               value={courseName}
//               onChange={(e) => setCourseName(e.target.value)}
//               placeholder="Enter course name"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="title">Title:</label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter title"
//             />
//           </div>

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SubmitDocumentPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import '/Users/valentine/AskBuddy/AskBuddy-front/my-vite-app/src/styles/SubmitDocument.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate fields: if any field is empty, show error
    if (!mediaType || !description || !courseName || !title) {
      setError('Please fill out all fields.');
      return;
    }
    // If valid, clear error and show submission message/confetti
    setError('');
    setSubmitted(true);
    console.log({ mediaType, description, courseName, title });
    
    // Optionally reset form fields after submission
    setTimeout(() => {
      setSubmitted(false);
      setMediaType('');
      setDescription('');
      setCourseName('');
      setTitle('');
    }, 3000);
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  return (
    <div className="page-container">
      {submitted && (
        <>
          <Confetti width={width} height={height} />
          <div className="submission-popup">
            <p>Your upload has been submitted!</p>
          </div>
        </>
      )}

      {/* <div className="content">
        <h1>Submit Your Document</h1>
        
        <form onSubmit={handleSubmit} className="form-container">
          {error && <p className="error">{error}</p>}

          
          <div className="form-group-row">
            <label htmlFor="mediaType">Media Type:</label>
            <select
              id="mediaType"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="article link">Article Link</option>
              <option value="youtube link">YouTube Link</option>
              <option value="pdf doc">PDF Document</option>
              <option value="image">Image</option>
            </select>
          </div> */}

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
          { (mediaType === 'article link' || mediaType === 'youtube link') && (
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

          { (mediaType === 'pdf doc' || mediaType === 'image') && (
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
    </div>
  );
};

export default SubmitDocumentPage;
