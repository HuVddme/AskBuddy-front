import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Home.css";
import buddyLogo from '../assets/BuddysBirthday.png';

const LandingPage = () => {
  const [typedText, setTypedText] = useState("")
  const fullText = "Whhat can Buddy do for you today?"
  const speed = 100 // typing speed in ms

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(i))
      i++
      if (i >= fullText.length) {
        clearInterval(timer)
      }
    }, speed)

    // Cleanup on unmount
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="landing-container">
      <div className="content">
      <img 
          className="logo" 
          src={buddyLogo} 
          alt="Buddy's Brain Logo" 
        />
        <h1 className="animate-slide-in">Welcome to Buddy's Brain</h1>
        
        {/* Typewriter Text */}
        <h2 className="typewriter-text">{typedText}</h2>
        
        <div className="buttons-row">
        <Link className="button-link" to="/ask">
            Ask Buddy
          </Link>
          <Link className="button-link" to="/submit">
            Share Some Wisdom
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage