import React from 'react';

type AuthButtonProps = {
  user: { name: string; image: string } | null;
  handleSpotifyAuth: () => void;
};

const AuthButton: React.FC<AuthButtonProps> = ({ user, handleSpotifyAuth }) => (
  <div className="auth-container">
    {user ? (
      <button 
        className="spotify-auth-btn"
        onClick={handleSpotifyAuth}
      >
        <img 
          src={user.image} 
          alt="user avatar" 
          className="spotify-logo spotify-image"
        />
        {user.name}
      </button>
    ) : (
      <button 
        className="spotify-auth-btn"
        onClick={handleSpotifyAuth}
      >
        <img 
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" 
          alt="Spotify Logo" 
          className="spotify-logo"
        />
        Connect with Spotify
      </button>
    )}
  </div>
);

export default AuthButton; 