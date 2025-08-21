import React, {useState} from 'react';

import styles from '../styles/Playlist.module.css';


export default function Playlist(props) {

    const {authToken, playlist} = props;
    const [playlistName, setPlaylistName] = useState('');


    // Get the users spotify id to create playlists
    async function getUserID() {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    

    
    // Handles updating the playlist name
    function handleOnChange(e) {
        setPlaylistName(e.target.value);
    }



    // Creates a spotify playlist
    async function createPlaylist(name, uid) {
        try {
            console.log(`uid is ${uid}`);
            const response = await fetch(`https://api.spotify.com/v1/users/${uid}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    'name': name
                })
            })

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return jsonResponse.id;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addTracksToPlaylist(playlistID) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    'uris': playlist.map(track => track.uri)
                })
            })
            if (response.ok) {
                console.log('Songs added successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }


    // Create a  playlist and add each track to it
    async function handleSave() {
        const uid = await getUserID();
        const playlistID = await createPlaylist(playlistName, uid);
        await addTracksToPlaylist(playlistID);
    }
    


    return (
        <div className={styles.playlist}>
            <input className={styles.playlistName} name='playlist' id='playlist' placeholder='playlist name' onChange={handleOnChange}/>
            <ul className={styles.playlistTracks}>
                {playlist.map((track, index) => {
                    return (
                        <li className={styles.playlistItem} key={index}>
                            <h3>{track.name}</h3>
                            {track.artist} | {track.album}
                        </li>
                    )
                })}
            </ul>
            <button className={styles.savePlaylistButton} onClick={handleSave}>SAVE TO SPOTIFY</button>
        </div>
    );
}