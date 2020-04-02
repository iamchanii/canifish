import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './fontObserver';
import detectBrowser from './detectBrowser';

detectBrowser();

const { createRoot } = ReactDOM as any;
const rootNode = document.getElementById('root');

createRoot(rootNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
