// components/ChallengeModal.jsx - Update with image generation
import React, { useState, useRef, useEffect } from 'react';
import { generateShareImage } from '../utils/imageGenerator';

const ChallengeModal = ({ onClose, score, username }) => {
  const [inviteLink, setInviteLink] = useState(`${window.location.origin}/play?invitedBy=${username}`);
  const [shareImage, setShareImage] = useState(null);
  const linkRef = useRef(null);

  useEffect(() => {
    // Generate share image
    const imageUrl = generateShareImage(username, score);
    setShareImage(imageUrl);
  }, [username, score]);

  const copyLink = () => {
    linkRef.current.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
  };

  const shareOnWhatsApp = () => {
    const text = `Hey! I scored ${score.correct}/${score.total} in Globetrotter! Can you beat me? Play here: ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Challenge a Friend</h2>
        
        {shareImage && (
          <div className="mb-4">
            <img 
              src={shareImage} 
              alt="Challenge" 
              className="w-full h-auto rounded-lg shadow-sm" 
            />
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-center">
            <span className="font-semibold">{username}</span> scored {' '}
            <span className="text-green-600 font-bold">{score.correct}</span> out of {' '}
            <span className="text-blue-600 font-bold">{score.total}</span>
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Share this link:</label>
          <div className="flex">
            <input
              ref={linkRef}
              value={inviteLink}
              readOnly
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary"
            />
            <button
              onClick={copyLink}
              className="bg-gray-200 hover:bg-gray-300 px-4 rounded-r-md"
            >
              Copy
            </button>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={shareOnWhatsApp}
            className="btn bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
          >
            <span className="mr-2">Share on WhatsApp</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Continue Playing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;