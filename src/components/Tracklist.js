import react from 'react';
import Track from './Track';


export default function Tracklist(props) {

    const tracksArray = props.queryResults;

    return (
        // For each track in tracks array, render a Track component
        <ul>
            {tracksArray.map((track, index) => {
              return <Track key={index} trackObj={track}/>
            })}
        </ul>
    )
}