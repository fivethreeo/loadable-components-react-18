import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App';

const render = App => {
  ReactDOMClient.hydrateRoot(document, <App assets={window.assetManifest}/>);
};

render(App);