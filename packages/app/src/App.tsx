/* @jsx jsx */

import React, { Suspense } from 'react';
import FishList from './components/fish/FishList';
import { css, jsx } from '@emotion/core';
import { colors } from '@canifish/ui';

const style = css`
  background: ${colors.beige};
  padding: 2rem 0;

  h1 {
    margin: 0 0 1em;
    text-align: center;
    color: ${colors.brown};
  }
`;

function App() {
  return (
    <main css={style}>
      <h1>Can I Fish?</h1>

      <Suspense fallback="Loading...">
        <FishList />
      </Suspense>
    </main>
  );
}

export default App;
