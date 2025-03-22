import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/Users/valentine/AskBuddy/AskBuddy-front/my-vite-app/src/styles/AskQuestion.css';

const AskQuestionPage = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle question submission here
    console.log({ question });
  };

  return (
    <div className="page-container">
      <div className="content">
        <h1>Ask Buddy the Bison</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Your Question:</label>
            <input 
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
            />
          </div>
          <button type="submit">Submit Question</button>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionPage;
