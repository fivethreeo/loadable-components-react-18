import React from 'react';
import { renderToStream } from 'react-streaming/server'
import { Helmet } from 'react-helmet';
import App from '../src/components/App';

export default async (req, res, next) => {
  const helmet = Helmet.renderStatic();
  const {
    injectToStream,
    pipe, // Defined if running in Node.js, otherwise `null`
    readable // Defined if running on the Edge (.e.g. Coudflare Workers), otherwise `null`
  } = await renderToStream(<App />)
  
  pipe(res);
};