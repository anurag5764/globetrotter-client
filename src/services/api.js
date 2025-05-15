// services/api.js
import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const fetchRandomDestination = async () => {
  try {
    const response = await axios.get(`${API_URL}/destinations/random`);
    return response.data;
  } catch (error) {
    console.error("Error fetching random destination:", error);
    throw error;
  }
};

export const verifyAnswer = async (id, answer) => {
  try {
    const response = await axios.post(`${API_URL}/destinations/verify`, {
      id,
      answer,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying answer:", error);
    throw error;
  }
};

export const saveUserScore = async (username, score) => {
  try {
    const response = await axios.post(`${API_URL}/users/score`, {
      username,
      score,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving user score:", error);
    throw error;
  }
};

export const getUserScore = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/score/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user score:", error);
    throw error;
  }
};
