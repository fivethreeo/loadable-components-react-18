import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'stream';
import { ChunkExtractor } from '@loadable/server'
import App from '../src/components/App';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from  'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const statsFile = join(__dirname, "../dist/client/loadable-stats.json");

export default async (req, res, next) => {
  let didError = false;
  let shellReady = false;

  let stats = await fs.readFile(statsFile).then(data=>JSON.parse(data)).catch(()=>({}))

  const extractor = new ChunkExtractor({ stats })

  // Ignore entry 
  extractor.getScriptTagsSince()

  class LoadableWritable extends Writable {
    constructor(writable) {
      super();
      this._writable = writable;
    }

    _write(chunk, encoding, callback) {
      // This should pick up any new link tags that hasn't been previously
      // written to this stream.
        const scriptTags = extractor.getScriptTagsSince()
        const linkTags = extractor.getLinkTagsSince()
        if (scriptTags) {
          this._writable.write(scriptTags, encoding)
        }
        if (linkTags) {
          this._writable.write(linkTags, encoding) 
        }
      // Finally write whatever React tried to write.

      this._writable.write(chunk, encoding);
      callback()
    }

    end() {
      this._writable.end();
    }

    flush() {
      if (typeof this._writable.flush === 'function') {
        this._writable.flush();
      }
    }
  }
  
  const writeable = new LoadableWritable(res)

  const stream = renderToPipeableStream(extractor.collectChunks(<App assets={stats} />),
    {
      bootstrapScripts: extractor.getMainAssets().map((asset)=>asset.url),
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        shellReady = true;
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
  
  stream.pipe(writeable);

};