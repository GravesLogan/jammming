import react from 'react';
import Track from './Track';

import styles from '../styles/Tracklist.module.css';


export default function Tracklist(props) {

    const tracksArray = props.queryResults;
    const {handlePlaylist} = props;

    return (
        // For each track in tracks array, render a Track component
        <ul className={styles.tracklist}>
            {tracksArray.map((track, index) => {
              return <Track key={index} trackObj={track} handlePlaylist={handlePlaylist}/>
            })}
        </ul>
    )
}