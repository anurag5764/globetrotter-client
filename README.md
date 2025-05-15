Globetrotter Client
Overview
This is the frontend for the Globetrotter travel guessing game, a React app where users guess cities based on clues and track their scores.
The backend is in a separate repository: globetrotter-backend.
Tech Stack

Frontend:
React: For the user interface.
Axios: For API requests.


Backend (globetrotter-backend):
Node.js & Express: For the server.
CORS: To allow frontend requests.


Data: Managed by the backend (destination.json).

Setup Instructions
Prerequisites

Node.js (v18+)
npm
Git

Frontend Setup

Clone the Repository:
git clone https://github.com/anurag5764/globetrotter-client.git
cd globetrotter-client


Install Dependencies:
npm install


Set Up Environment Variables:Create .env:
REACT_APP_API_URL=http://localhost:3001


Run the Frontend:
npm start

Visit http://localhost:3000.


Backend Setup

Clone the Backend Repository:
git clone https://github.com/anurag5764/globetrotter-backend.git
cd globetrotter-backend


Install Dependencies:
npm install


Set Up Environment Variables:Create server/.env:
PORT=3001
CORS_ORIGIN=http://localhost:3000


Run the Backend:
npm start

Test it: curl http://localhost:3001/api/health (should return {"status":"ok"}).



Created on May 15, 2025, by Anurag5764
