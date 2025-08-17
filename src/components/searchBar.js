import React, { use, useState } from 'react';
import styles from '../styles/SearchBar.module.css';


export default function SearchBar() {

    const [search, setSearch] = useState('');

    function handleOnChange(e) {
        setSearch(e.target.value);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log('searching for:', search);
    }
    

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input id='search' name='search' placeholder='search by title, name, genre, etc...' onChange={handleOnChange}></input>
                <button type='submit'>Search</button>
            </form>
            <h1>Searching for {search}</h1>
        </div>
    )
}