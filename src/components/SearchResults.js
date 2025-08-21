import React from 'react';

import styles from '../styles/SearchResults.module.css';    

import Tracklist from './Tracklist';

export default function SearchResults(props) {
    let {queryResults} = props;
    let {handlePlaylist} = props;


    return (
    <div className={styles.searchResults}>
        <h2>Results</h2>
        <Tracklist queryResults={queryResults} handlePlaylist={handlePlaylist}/>
    </div>
)
}

