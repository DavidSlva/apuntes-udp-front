import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import whitTheme from './theme/antdTheme';
import './theme/tailwindcss.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>{whitTheme(<App />)}</React.StrictMode>);
