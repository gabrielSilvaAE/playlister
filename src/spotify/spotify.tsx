export const spotifyAuthenticateUser = async () => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const redirectUri = "http://127.0.0.1:5173/callback";
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-read-recently-played",
      "user-top-read",
      "playlist-modify-public",
      "playlist-modify-private",
      "playlist-read-private",
      "playlist-read-collaborative",
    ]
    const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&state=izzy&response_type=code`;
    window.location.href = authUrl;
}

// export const getSpotifyToken = async () => {
//   const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//   const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

//   const response = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
//     },
//     body: new URLSearchParams({
//       grant_type: 'client_credentials',
//       client_id: clientId,
//       client_secret: clientSecret
//     })
//   });
//   const data = await response.json();
//   localStorage.setItem('accessToken', data.access_token);
// }

export const getUserCode = async () => {
//   let accessToken = localStorage.getItem('accessToken') || '';
//   await getSpotifyToken();
//   accessToken = localStorage.getItem('accessToken') || '';
//   if (!accessToken) {
//     throw new Error('No access token found');
//   }
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const token = code || localStorage.getItem('spotifyToken') || '';
  localStorage.setItem('spotifyToken', token);

  // this shouldnt be here
  const res = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
}

export const searchTrackSpotify = async (query: string) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search tracks');
  }

  const data = await response.json();
  return data.tracks.items;
}
