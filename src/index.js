import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <App />
        <div className='image-wrapper'>
            <img src='cartridge.jpg' alt='Cartridge' className='cartridge-image' />
        </div>
    </div>
    
);

 