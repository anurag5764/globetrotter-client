import React, { useState, useEffect } from 'react';
import Clue from './Clue';
import AnswerOptions from './AnswerOptions';
import FeedbackPopup from './FeedbackPopup';
import ScoreBoard from './ScoreBoard';
import ChallengeModal from './ChallengeModal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const [currentDestination, setCurrentDestination] = useState(null);
  const [destinationId, setDestinationId] = useState(null);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [invitedBy, setInvitedBy] = useState(null);
  const [inviterScore, setInviterScore] = useState(null);

  const location = useLocation();

  // Use environment variable for API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const inviter = params.get('invitedBy');
    if (inviter) {
      setInvitedBy(inviter);
    }

    const storedUsername = localStorage.getItem('globetrotterUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setShowUsernameModal(true);
    }

    fetchNewDestination();
  }, [location]);

  // Fetch inviter's score dynamically with polling
  useEffect(() => {
    if (!invitedBy) return;

    const fetchInviterScore = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/score/${invitedBy}`);
        const userScore = response?.data?.user?.score;
        setInviterScore(userScore || { correct: 7, total: 10 });
      } catch (error) {
        console.error('Error fetching inviter score:', error);
        setInviterScore({ correct: 7, total: 10 });
      }
    };

    fetchInviterScore();
    const intervalId = setInterval(fetchInviterScore, 10000);
    return () => clearInterval(intervalId);
  }, [invitedBy]);

  // Save score whenever it changes
  useEffect(() => {
    const saveScore = async () => {
      if (username && score.total > 0) {
        try {
          await axios.post(`${API_URL}/api/users/score`, {
            username,
            score,
          });
        } catch (error) {
          console.error('Error saving score:', error);
        }
      }
    };

    saveScore();
  }, [score, username]);

  const fetchNewDestination = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/destinations/random`);
      setCurrentDestination(response.data);
      setDestinationId(response.data.id);
      setAnswerOptions(response.data.options);
      setSelectedAnswer(null);
      setFeedback(null);
    } catch (error) {
      console.error('Error fetching destination:', error);
      setAnswerOptions(['Paris', 'Rome', 'London', 'Tokyo']);
    }
    setLoading(false);
  };

  const handleAnswer = async (answer) => {
    setSelectedAnswer(answer);
    try {
      const response = await axios.post(`${API_URL}/api/destinations/verify`, {
        id: destinationId,
        answer,
      });
      const { correct, destination } = response.data;
      setFeedback({
        isCorrect: correct,
        destination,
      });
      setScore((prevScore) => ({
        correct: prevScore.correct + (correct ? 1 : 0),
        incorrect: prevScore.incorrect + (correct ? 0 : 1),
        total: prevScore.total + 1,
      }));
    } catch (error) {
      console.error('Error verifying answer:', error);
    }
  };

  const handleNext = () => {
    fetchNewDestination();
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('globetrotterUsername', username.trim());
      setShowUsernameModal(false);
      // Dispatch custom event to notify Header
      window.dispatchEvent(new Event('usernameSaved'));
    }
  };

  const handleChallengeFriend = () => {
    setShowChallengeModal(true);
  };

  if (loading && !currentDestination) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {invitedBy && inviterScore && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-center">
          <p>
            You've been challenged by <span className="font-semibold">{invitedBy}</span> who scored{' '}
            <span className="text-green-600 font-bold">{inviterScore.correct}</span> out of{' '}
            <span className="text-blue-600 font-bold">{inviterScore.total}</span>. Can you beat them?
          </p>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:space-x-6 mb-8">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <ScoreBoard score={score} />
          <div className="text-center">
            <button onClick={handleChallengeFriend} className="btn-accent mb-4 w-full">
              Challenge a Friend
            </button>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Guess the Destination</h2>
            {currentDestination && currentDestination.clues && (
              <div className="mb-6">
                {currentDestination.clues.slice(0, 2).map((clue, index) => (
                  <Clue key={index} clue={clue} index={index} />
                ))}
              </div>
            )}
            {answerOptions.length > 0 && (
              <AnswerOptions options={answerOptions} onAnswer={handleAnswer} />
            )}
          </div>
        </div>
      </div>
      {feedback && (
        <FeedbackPopup isCorrect={feedback.isCorrect} destination={feedback.destination} onNext={handleNext} />
      )}
      {showUsernameModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-4">Welcome to Globetrotter!</h2>
            <p className="text-center mb-4">Choose a username to start playing and challenge friends.</p>
            <form onSubmit={handleUsernameSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Start Playing
              </button>
            </form>
          </div>
        </div>
      )}
      {showChallengeModal && (
        <ChallengeModal onClose={() => setShowChallengeModal(false)} score={score} username={username} />
      )}
    </div>
  );
};

export default Game;
