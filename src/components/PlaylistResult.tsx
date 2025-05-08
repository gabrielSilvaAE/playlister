import React from 'react';

type PlaylistResultProps = {
  playlistLink: string;
};

const PlaylistResult: React.FC<PlaylistResultProps> = ({ playlistLink }) => (
  <div className="card">
    <h2>Go listen to some music</h2>
    <div className="read-the-docs">
      {playlistLink && <a href={playlistLink} target="_blank" rel="noopener noreferrer">Open in Spotify</a>}
    </div>
  </div>
);

export default PlaylistResult; 