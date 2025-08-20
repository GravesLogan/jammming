import React from 'react';


export default function Track(props) {
    const {trackObj} = props;
    return (
        <li>
            {trackObj.name} made by {trackObj.artist} in the {trackObj.album}.
        </li>
    )
}