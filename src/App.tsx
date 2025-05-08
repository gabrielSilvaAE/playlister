import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import { promptTrack } from './harmix/harmix'
import logo from './assets/logo.png';
import { getUserCode, searchTrackSpotify, spotifyAuthenticateUser } from './spotify/spotify';
type FormInputs = {
  searchQuery: string;
}


function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  
  const handleSpotifyAuth = () => {
    spotifyAuthenticateUser();
  }

  const [playlistLink, setPlaylistLink] = useState<string>('');
  const [music, setMusic] = useState<string[]>(['No playlist generated yet']);

  const onSubmit = async (data: FormInputs) => {
    try {
      const results = await promptTrack(data.searchQuery);
      const mappedResults = results.tracks.map(({ metadata }) =>`${metadata.artists[0] || ''} - ${metadata.track_title}`);
      const spotifyResults = await Promise.all(mappedResults.map(async (result) => 
        await searchTrackSpotify(result)
      ));
      
      setMusic(spotifyResults.map((result) => result[0].uri));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserCode();
  }, []);

  return (
    <>
      <header>
        <h1><img src={logo} alt="Logo" className="logo-title" />Playlister - Your new favorite songs, right in your streaming service</h1>
      </header>
      <main>
        <div>
          <h2>Log in to Spotify</h2>
          <div className="auth-container">
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
          </div>
        </div>
        <div className="card">
          <h2>Generate a playlist</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input 
              className="playlist-input" 
              type="text" 
              placeholder="Enter what you like" 
              {...register("searchQuery", { required: "This field is required" })}
            />
            {errors.searchQuery && <span className="error-message">{errors.searchQuery.message}</span>}
            <button type="submit">Generate</button>
          </form>
        </div>
        <div className="card">
          <h2>Go listen to some music</h2>
          <div className="read-the-docs">
            {music.map(music => <p key={music}>{music}</p>)}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
