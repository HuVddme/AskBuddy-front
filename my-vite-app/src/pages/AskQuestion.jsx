import React, { useState } from 'react'

const AskQuestionPage = () => {
  const [question, setQuestion] = useState('')

  const handleQuestionSubmit = (e) => {
    e.preventDefault()
    // Handle the question submission logic here
    console.log({ question })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Ask Buddy the Bison</h1>
      <form onSubmit={handleQuestionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div>
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
  )
}

export default AskQuestionPage
