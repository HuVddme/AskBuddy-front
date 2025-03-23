import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '/Users/valentine/AskBuddy/AskBuddy-front/my-vite-app/src/styles/Home.css'

const LandingPage = () => {
  const [typedText, setTypedText] = useState("")
  const fullText = "What can Buddy do for you today?"
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
        <h1 className="animate-slide-in">Welcome to Buddy's Brain</h1>
        
        {/* Typewriter Text */}
        <h2 className="typewriter-text">{typedText}</h2>
        
        <div className="buttons-row">
          <Link className="button-link" to="/submit">
            Submit Your Document
          </Link>
          <Link className="button-link" to="/ask">
            Ask a Question
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
//   return (
//     <div className="landing-container">
//       <div className="content">
//         <h1 className="animate-slide-in">Welcome to Buddy's Brain</h1>
//         <div className="buttons">
//           <Link className="animate-slide-in" to="/submit">
//             Submit Your Document
//           </Link>
//           <Link className="animate-slide-in" to="/ask">
//             Ask a Question
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LandingPage
