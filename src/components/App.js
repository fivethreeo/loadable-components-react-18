import React from 'react';
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

export default () => (
  <div>
    <div style={{
      backgroundColor: 'black',
      color: 'lightgrey',
      padding: '1rem'
    }} onClick={() => alert('shell is interactive')}>
     <h1>Module Federation Example: Server Side Rendering</h1>
     <h2>This is the shell application.</h2>
    </div>
      <OtherComponent />
  </div >
);
