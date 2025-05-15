import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [username, setUsername] = useState(null);

  // Fetch username from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('globetrotterUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Listen for a custom event when the username is saved
    const handleUsernameUpdate = () => {
      const updatedUsername = localStorage.getItem('globetrotterUsername');
      setUsername(updatedUsername);
    };

    window.addEventListener('usernameSaved', handleUsernameUpdate);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('usernameSaved', handleUsernameUpdate);
    };
  }, []); // Empty dependency array to run only on mount

  return (
    <header className="bg-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="mr-2">🧩</span> Globetrotter
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/play" className="hover:text-accent transition-colors">
                Play
              </Link>
            </li>
            {username && (
              <li>
                <Link to={`/profile/${username}`} className="hover:text-accent transition-colors">
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
