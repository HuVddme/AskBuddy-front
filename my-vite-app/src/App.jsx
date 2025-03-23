import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/Home'
import SubmitDocumentPage from './pages/SubmitDocument'
import AskQuestionPage from './pages/AskQuestion'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/submit" element={<SubmitDocumentPage />} />
        <Route path="/ask" element={<AskQuestionPage />} />
      </Routes>
    </Router>
  )
}

export default App
