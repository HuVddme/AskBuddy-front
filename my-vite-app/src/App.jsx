import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/Home'
import SubmitDocumentPage from './pages/SubmitDocument'
import AskQuestionPage from './pages/AskQuestion'

const App = () => {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/submit">Submit Document</Link>
        <Link to="/ask">Ask a Question</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/submit" element={<SubmitDocumentPage />} />
        <Route path="/ask" element={<AskQuestionPage />} />
      </Routes>
    </Router>
  )
}

export default App
