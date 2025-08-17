import './App.css';
import React from 'react';

// Importing components
import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Track from './components/Track';
import Tracklist from './components/Tracklist';

function App() {

  const [search, setSearch] = useState('');


  function handleSearchChange(search) {
    setSearch(search);
  }

  return (
    <div>
      <SearchBar handleSearchChange={handleSearchChange}/>
      <p>The search value is: {search}</p>
    </div>
  );
}

export default App;
