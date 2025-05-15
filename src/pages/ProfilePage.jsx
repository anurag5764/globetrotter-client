import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use environment variable for API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  // Reset score on page refresh
  useEffect(() => {
    const resetScore = async () => {
      try {
        await axios.post(`${API_URL}/api/users/score`, {
          username,
          score: { correct: 0, incorrect: 0, total: 0 },
        });
      } catch (error) {
        console.error('Error resetting score:', error);
      }
    };
    if (username) {
      resetScore();
    }
  }, []); // Empty dependency array to run only on mount

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/users/score/${username}`);
        setProfile(response.data.user);
        setError(null);
      } catch (error) {
        setError('User not found or error loading profile');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p>{error}</p>
        </div>
        <Link to="/" className="btn-primary mt-4 inline-block">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 sm:mb-0 sm:mr-6">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{username}</h2>
              <p className="text-gray-600">Globetrotter Player</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Correct</p>
              <p className="text-2xl font-bold text-green-600">{profile.score.correct}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Incorrect</p>
              <p className="text-2xl font-bold text-red-600">{profile.score.incorrect}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-blue-600">{profile.score.total}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">{username}</span> has played Globetrotter since{' '}
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-center">
            <Link to="/play" className="btn-primary">
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;