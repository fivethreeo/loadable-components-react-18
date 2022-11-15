import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'stream';
import { StreamingChunkExtractor } from './streamingChunkextractor';
import App from '../src/components/App';
import Html from './html.jsx';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from  'fs/promises';
import { data } from 'browserslist';

const __dirname = dirname(fileURLToPath(import.meta.url));
const statsFile = join(__dirname, "../dist/client/loadable-stats.json");

export default async (req, res, next) => {
  let didError = false;
  let shellReady = false;
  console.log(__dirname)
  let stats = await fs.readFile(statsFile).then(data=>JSON.parse(data)).catch(()=>({}))

  const extractor = new StreamingChunkExtractor({ stats })
  
  class LoadableWritable extends Writable {
    constructor(writable) {
      super();
      this._writable = writable;
    }

    _write(chunk, encoding, callback) {
      // This should pick up any new link tags that hasn't been previously
      // written to this stream.
      if (shellReady) {
        this._writable.write(extractor.getScriptTagsSince())
        this._writable.write(extractor.getLinkTagsSince())
      }
      // Finally write whatever React tried to write.

      this._writable.write(chunk, encoding, callback);
    }

    end() {
      this._writable.end()
    }

    flush() {
      if (typeof this._writable.flush === 'function') {
        this._writable.flush();
      }
    }
  }

  const writeable = new LoadableWritable(res)
  const stream = renderToPipeableStream(extractor.collectChunks(<Html><App /></Html>),
    {
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        shellReady = true;

        stream.pipe(writeable);

      },
      onShellError(error) {
        // Something errored before we could complete the shell so we emit an alternative shell.
        res.statusCode = 500;
        res.send(
          '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
        );
      },
      onAllReady() {
        // If you don't want streaming, use this instead of onShellReady.
        // This will fire after the entire page content is ready.
        // You can use this for crawlers or static generation.

        // res.statusCode = didError ? 500 : 200;
        // res.setHeader('Content-type', 'text/html');
        // stream.pipe(res);
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );
};