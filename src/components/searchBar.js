import React, { useState } from 'react';
import styles from '../styles/SearchBar.module.css';


export default function SearchBar(props) {


    const [search, setSearch] = useState('');

    const {handleQueryResults} = props;
    const {authToken} = props;

    // Handle input change in search bar. Updates the search state in App.js.
    function handleOnChange(e) {
        setSearch(e.target.value);
    }

    // Handle form submission.
    function handleOnSubmit(e) {
        e.preventDefault();
        document.getElementById('search').value = ''; // Clear the input field after submission

        // call the Spotify API search function with the search term
        const query = encodeURIComponent(search);
        const searchSpotify = async() => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    // Process the response to extract relevant data
                    const results = jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
                    // Pass the results
                    handleQueryResults(results);
                }
            } catch (error) {
                console.log('Error fetching data from Spotify API', error);
            }
        }

        searchSpotify();
    }
    

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input id='search' name='search' placeholder='search by title, name, genre, etc...' onChange={handleOnChange}></input>
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}