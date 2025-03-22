import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Buddy's Brain</h1>
      <p>Please choose an option:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <Link to="/submit">Submit Your Document</Link>
        <Link to="/ask">Ask a Question</Link>
      </div>
    </div>
  )
}

export default LandingPage
