
import React, { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'
import Html from './Html'


const Comments = loadable(() => import('./Comments' /* webpackPrefetch: true */), { ssrSuspense: true });
const Post = loadable(() => import('./Post' /* webpackPrefetch: true */), { ssrSuspense: true });

const App = ({ assets }) => {
  return (
    <Html assets={assets} title="Hello">
      <Suspense fallback="Loading">
        <ErrorBoundary FallbackComponent={Error}>
          <Content />
        </ErrorBoundary>
      </Suspense>
    </Html>
  )
}

function Content() {
  return (
    <>
      <Suspense fallback="Loading">
        <Post />
      </Suspense>
      <Suspense fallback="Loading">
        <Comments />
      </Suspense>
      <h2>Thanks for reading!</h2>
    </>
  );
}
function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  );
}

export default App