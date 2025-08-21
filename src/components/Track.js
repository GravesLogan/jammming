import React from 'react';

import styles from '../styles/Track.module.css';

export default function Track(props) {
    const {trackObj} = props;
    const {handlePlaylist} = props;


    function handleAdd(e) {
        handlePlaylist(trackObj);
    }

    return (
        <div className={styles.track}>
            <li className={styles.trackItem}>
                <h3>{trackObj.name}</h3>
                {trackObj.artist} | {trackObj.album}
            </li>
            <button className={styles.addButton} onClick={handleAdd}>+</button>
        </div>
    )
}