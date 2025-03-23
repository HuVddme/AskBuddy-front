import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom';
import "../styles/SubmittedPage.css";


const SubmittedPage = ({ title = '' }) => {
  // Capture window size for Confetti
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  // Optional: stop confetti after a certain time to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-container">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      
      <div className="content animate-slide-in">
        <div className="success-icon">✓</div>
        <h1>Success!</h1>
        
        <div className="typewriter-text">
          {title ? `"${title}" has been submitted!` : 'Your upload has been submitted!'}
        </div>
        
        <p className="success-message">
          Thank you for contributing to our learning resources. 
          Your submission is now being processed and will be available soon.
        </p>
        
        <div className="buttons-row">
          <Link to="/submit" className="button-link">Submit Another</Link>
          <Link to="/resources" className="button-link">View Resources</Link>
        </div>
      </div>
    </div>
  );
};

export default SubmittedPage;