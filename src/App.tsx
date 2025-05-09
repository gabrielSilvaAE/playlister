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
  selectedGenres: string[];
  selectedMoods: string[];
  selectedInstruments: string[];
}


function App() {
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormInputs>();
  
  const handleSpotifyAuth = () => {
    spotifyAuthenticateUser();
  }

  const [playlistLink, setPlaylistLink] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    try {
      const results = await promptTrack(data.searchQuery, data.selectedGenres, data.selectedMoods, data.selectedInstruments);
      const mappedResults = results.tracks.map(({ metadata }) =>`${metadata.artists[0] || ''} - ${metadata.track_title}`);
      const spotifyResults = await Promise.all(mappedResults.map(async (result) => 
        await searchTrackSpotify(result)
      ));
      const playlistTracks = spotifyResults.map((result) => result[0].uri);
      console.log(playlistTracks);
      // const playlist = await createPlaylist(user.id, data.searchQuery, playlistTracks);
      setPlaylistLink(playlistTracks.join(','));
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserCode().then(() => {
      if(localStorage.getItem('accessToken')) {
        getUser().then((user) => {
          setUser({
            name: user.display_name,
            image: user.images[0].url,
            id: user.id
          });
        });
      }
    });
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <header>
        <h1 className="flex items-center">
          <img src={logo} alt="Logo" className="logo-title" />
          <span>Playlister - Your new favorite songs, right in your streaming service</span>
        </h1>
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
          isUserLoggedIn={user !== null}
          control={control}
        />
        <PlaylistResult playlistLink={playlistLink} />
      </main>
    </>
  )
}

export default App
