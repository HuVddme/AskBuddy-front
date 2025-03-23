import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/AskQuestion.css';

const Valentine = () => {
  const [question, setQuestion] = useState('');
  const [recording, setRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Initialize Speech Recognition only once
  useEffect(() => {
    if (!isInitializedRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          // Get the latest transcript
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join(' ');
          setQuestion(transcript);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setRecording(false);
        };

        recognitionRef.current.onend = () => {
          console.log("Speech recognition ended");
        };

        isInitializedRef.current = true;
      }
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  // Function to submit the question
  const submitQuestion = () => {
    if (!question.trim()) return;
    
    const userMessage = { sender: 'user', text: question };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    simulateBuddyResponse();
  };

  // Toggle recording on/off when the mic button is clicked.
  // When stopping the recording, the question is automatically submitted.
  const toggleRecording = () => {
    if (!recording) {
      // Start recording
      setQuestion('');
      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
          console.log("Started recording");
          setRecording(true);
        }
      } catch (err) {
        console.error("Error starting recording:", err);
      }
    } else {
      // Stop recording and submit the question
      try {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          console.log("Stopped recording");
        }
      } catch (err) {
        console.error("Error stopping recording:", err);
      }
      setRecording(false);
      submitQuestion();
    }
  };

  // Simulate Buddy's AI response
  const simulateBuddyResponse = () => {
    setTimeout(() => {
      const aiResponseText = 'This is a simulated response from Buddy.';
      const aiResponse = { sender: 'buddy', text: aiResponseText };
      setMessages(prev => [...prev, aiResponse]);
      // Use text-to-speech for Buddy's response
      const utterance = new SpeechSynthesisUtterance(aiResponseText);
      window.speechSynthesis.speak(utterance);
    }, 1000);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-button">Back</Link>
      <div className="content">
        <h1>Ask Buddy the Bison</h1>
        <form onSubmit={(e) => { e.preventDefault(); submitQuestion(); }} className="form-container">
          <div className="form-group">
            <label>Your Question:</label>
            <input 
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
            />
          </div>
          {/* Centered Microphone Button acts as both start & submit */}
          <button
            type="button"
            className={`record-btn ${recording ? 'recording' : ''}`}
            onClick={toggleRecording}
          >
            {recording ? <FaStop size={20} /> : <FaMicrophone size={20} />}
          </button>
        </form>
        {/* Recording Indicator */}
        <div className="recording-indicator">
          {recording ? (
            <div className="pulse-recording">
              Recording in progress... Click the stop button when finished.
            </div>
          ) : (
            'Click the microphone icon to start recording your question.'
          )}
        </div>
        {/* Chat Conversation Display */}
        <div className="chat-container">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <strong>{msg.sender === 'user' ? 'You' : 'Buddy'}: </strong>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Valentine;
