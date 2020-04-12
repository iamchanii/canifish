/** @jsx jsx */

import { colors } from '@canifish/ui';
import { css, jsx } from '@emotion/core';
import { lazy, Suspense } from 'react';

const FishListContainer = lazy(() => import('./pages/FishListPage'));

const style = css`
  background: ${colors.appBgColor};
  padding: 2rem 0;
  min-height: 100%;

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
        <FishListContainer />
      </Suspense>
    </main>
  );
}

export default App;
