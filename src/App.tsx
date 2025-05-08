import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import { promptTrack } from './harmix/harmix'
import logo from './assets/logo.png';
import { getUserCode, getUser, searchTrackSpotify, spotifyAuthenticateUser, createPlaylist } from './spotify/spotify';
import AuthButton from './components/AuthButton';
import PlaylistForm from './components/PlaylistForm';
import PlaylistResult from './components/PlaylistResult';

type FormInputs = {
  searchQuery: string;
}


function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  
  const handleSpotifyAuth = () => {
    spotifyAuthenticateUser();
  }

  const [playlistLink, setPlaylistLink] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    try {
      const results = await promptTrack(data.searchQuery);
      const mappedResults = results.tracks.map(({ metadata }) =>`${metadata.artists[0] || ''} - ${metadata.track_title}`);
      const spotifyResults = await Promise.all(mappedResults.map(async (result) => 
        await searchTrackSpotify(result)
      ));
      const playlistTracks = spotifyResults.map((result) => result[0].uri);
      const playlist = await createPlaylist(user.id, data.searchQuery, playlistTracks);
      console.log(playlist);
      setPlaylistLink(playlist.external_urls.spotify);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user) {
      getUserCode();
      getUser().then((user) => {
        setUser({
          name: user.display_name,
          image: user.images[0].url,
          id: user.id
        });
      });
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <header>
        <h1><img src={logo} alt="Logo" className="logo-title" />Playlister - Your new favorite songs, right in your streaming service</h1>
      </header>
      <main>
        <div>
          <h2>Log in to Spotify</h2>
          <AuthButton user={user} handleSpotifyAuth={handleSpotifyAuth} />
        </div>
        <PlaylistForm 
          onSubmit={onSubmit} 
          register={register} 
          handleSubmit={handleSubmit} 
          errors={errors} 
          loading={loading} 
        />
        <PlaylistResult playlistLink={playlistLink} />
      </main>
    </>
  )
}

export default App
