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
    const clientId = '2236599dff70488ab94ff5fba9e4d227';
    const redirectUri = 'http://127.0.0.1:3000/';
    
    // stored in the previous step
    const codeVerifier = localStorage.getItem('code_verifier');

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

    localStorage.setItem('access_token', response.access_token);
    setAuthToken(response.access_token);
  }



  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (code) {
      console.log(`Code is: ${code}`);
      getToken(code);
    } else {
      getSpotifyAuthorization();
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


  return (
    <div className={styles}>
      <header><h1 class='regular'>Ja</h1><h1 class='color'>mmm</h1><h1 class='regular'>ing</h1></header>
      <SearchBar handleQueryResults={handleQueryResults} authToken={authToken} />
      <div class='result-playlist-container'>
        <SearchResults queryResults={queryResults} handlePlaylist={handlePlaylist}/>
        <Playlist authToken={authToken} playlist={playlist}/>
      </div>
    </div>
  );
}

export default App;
