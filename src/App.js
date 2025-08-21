import './App.css';
import React, { useState, useEffect } from 'react';

// Importing components
import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Track from './components/Track';
import Tracklist from './components/Tracklist';

import styles from './App';


import { getSpotifyAuthorization } from './spotifyRetrieval';

function App() {
  const [authToken, setAuthToken] = useState('');

  const getToken = async code => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = 'https://graveslogan.github.io/jammming/';
    
    // stored in the previous step
    const codeVerifier = sessionStorage.getItem('code_verifier');

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }

    const body = await fetch(url, payload);
    const response = await body.json();

    sessionStorage.setItem('access_token', response.access_token);
    setAuthToken(response.access_token);
  }



  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (!authToken) {
      if (sessionStorage.getItem('access_token')) {
        setAuthToken(sessionStorage.getItem('access_token'));
      } else {
        if (code) {
          getToken(code);
        } else {
          getSpotifyAuthorization();
        }
      }
    }
  }, []);
  

  // Handles the results from the spotify search.
  const [queryResults, setQueryResults] = useState([]);
  function handleQueryResults(results) {
    setQueryResults(results);
  }

  const [playlist, setPlaylist] = useState([]);
  function handlePlaylist(track) {
    setPlaylist([track, ...playlist]);
  }

  function clearPlaylist() {
    setPlaylist([]);
  }

  function handleRemove(index) {
    playlist.splice(index, 1);
    setPlaylist([...playlist]);
  }

  return (
    <div>
      <header><h1 className='regular'>Ja</h1><h1 className='color'>mmm</h1><h1 className='regular'>ing</h1></header>
      <SearchBar handleQueryResults={handleQueryResults} authToken={authToken} />
      <div className='result-playlist-container'>
        <SearchResults queryResults={queryResults} handlePlaylist={handlePlaylist}/>
        <Playlist authToken={authToken} playlist={playlist} clearPlaylist={clearPlaylist} handleRemove={handleRemove} />
      </div>
    </div>
  );
}

export default App;
