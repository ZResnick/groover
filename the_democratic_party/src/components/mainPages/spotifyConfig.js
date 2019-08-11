export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = `968a67d92b6a422eba48ee2e4994a960`;
export const redirectUri = 'http://localhost:3000/redirect';
export const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'playlist-modify',
];

const grooverPlaylist = '7q8vTaZKyjeOU474ZOyXig';

export default grooverPlaylist;
