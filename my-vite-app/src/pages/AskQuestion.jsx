import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import '../styles/AskQuestion.css';

const AskQuestionPage = () => {
  const [question, setQuestion] = useState('');
  const [recording, setRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [results, setResults] = useState([]); 
  const [selectedResult, setSelectedResult] = useState(null);

  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Initialize speech recognition
  useEffect(() => {
    if (!isInitializedRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
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

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {}
      }
    };
  }, []);

  // Function to submit question & call backend
  const submitQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: 'user', text: question };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');

    try {
      const response = await axios.post('http://0.0.0.0:8000/search', { query: userMessage.text });
      console.log('Backend response:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const toggleRecording = () => {
    if (!recording) {
      setQuestion('');
      try {
        recognitionRef.current?.start();
        console.log("Started recording");
        setRecording(true);
      } catch (err) {
        console.error("Error starting recording:", err);
      }
    } else {
      try {
        recognitionRef.current?.stop();
        console.log("Stopped recording");
      } catch (err) {
        console.error("Error stopping recording:", err);
      }
      setRecording(false);
      submitQuestion();
    }
  };

  const simulateBuddyResponse = () => {
    setTimeout(() => {
      const aiResponseText = 'This is a simulated response from Buddy.';
      const aiResponse = { sender: 'buddy', text: aiResponseText };
      setMessages(prev => [...prev, aiResponse]);

      const utterance = new SpeechSynthesisUtterance(aiResponseText);
      const voices = window.speechSynthesis.getVoices();
      console.log(voices);
      const selectedVoice = voices.find(voice => voice.name === 'Google UK English Female');
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      window.speechSynthesis.speak(utterance);
    }, 1000);
  };

  return (
    <div className="page-container">
      {!selectedResult && (
        <Link to="/" className="back-button">Back</Link>
      )}
      <div className="content">
        <h1>Ask Buddy the Bison</h1>
  
        {/* Your form and mic button */}
        <form onSubmit={(e) => { e.preventDefault(); submitQuestion(); }} className="form-container">
          <div className="form-group">
            {/* input or other controls */}
          </div>
          <button
            type="button"
            className={`record-btn ${recording ? 'recording' : ''}`}
            onClick={toggleRecording}
          >
            {recording ? <FaStop size={20} /> : <FaMicrophone size={20} />}
          </button>
        </form>
  
        {/* Recording indicator */}
        <div className="recording-indicator">
          {recording ? (
            <div className="pulse-recording">
              Recording in progress... Click the stop button when finished.
            </div>
          ) : (
            'Click the microphone icon to start recording your question.'
          )}
        </div>
  
        {/* Chat messages */}
        <div className="chat-container">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <strong>{msg.sender === 'user' ? 'You' : 'Buddy'}: </strong>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
  
        {/* Search results */}
        {results.length > 0 && (
          <div className="results-container">
            <h2>Search Results:</h2>
            <div className="results-scroll">
              <ul>
              {results.map((item) => (
                <li
                  key={item._id}
                  className="result-item hover-highlight"
                  onClick={() => setSelectedResult(item)}
                >
                  <h3 className="result-title">{item.title}</h3>
                  <a
                    href={item.media_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="result-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Resource
                  </a>
                </li>
              ))}
              </ul>
            </div>
          </div>
        )}
      </div> {/* .content */}
      
      {/* IMPORTANT: Modal moved outside .content div */}
      {selectedResult && (
        <div className="modal-overlay" onClick={() => setSelectedResult(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedResult(null)}>×</button>
            <h2>{selectedResult.title}</h2>
            <p>{selectedResult.summary}</p>
            <a
              href={selectedResult.media_link}
              target="_blank"
              rel="noopener noreferrer"
              className="result-link"
            >
              Go to Resource
            </a>
          </div>
        </div>
      )}
    </div> // .page-container
  );
};

export default AskQuestionPage;