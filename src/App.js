import './App.css';
import React from 'react';

// Importing components
import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Track from './components/Track';
import Tracklist from './components/Tracklist';

function App() {
  return (
    <div>
      <SearchBar />
    </div>
  );
}

export default App;
