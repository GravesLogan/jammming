import React, {useState} from 'react';

import styles from '../styles/Playlist.module.css';


export default function Playlist(props) {

    const {authToken, playlist, clearPlaylist, handleRemove} = props;
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
        } catch (error) {
            console.log(error);
        }
    }


    // Create a  playlist and add each track to it
    async function handleSave() {
        const uid = await getUserID();
        const playlistID = await createPlaylist(playlistName, uid);
        await addTracksToPlaylist(playlistID);
        clearPlaylist(); // Clear the playlist after saving
        setPlaylistName(''); // Reset the playlist name input
        document.getElementById('playlist').value = ''; // Clear the input field after saving
    }


    function handlePlaylistRemove(index) {
        handleRemove(index);
    }
    


    return (
        <div className={styles.playlist}>
            <input className={styles.playlistName} name='playlist' id='playlist' placeholder='playlist name' onChange={handleOnChange}/>
            <ul className={styles.playlistTracks}>
                {playlist.map((track, index) => {
                    return (
                        <div className={styles.row} key={index}>
                            <li>
                                <h3>{track.name}</h3>
                                {track.artist} | {track.album}
                            </li>
                            <button className={styles.removeButton} onClick={() => handlePlaylistRemove(index)}>-</button>
                        </div>
                    )
                })}
            </ul>
            <button className={styles.savePlaylistButton} onClick={handleSave}>SAVE TO SPOTIFY</button>
        </div>
    );
}