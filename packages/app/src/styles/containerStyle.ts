import { css } from '@emotion/core';
import media, { getBreakPoints } from 'css-in-js-media';

export default css`
  margin-left: auto;
  margin-right: auto;

  ${media('>=largeDesktop')} {
    max-width: ${getBreakPoints().largeDesktop}px;
  }

  ${media('<=largeDesktop', '>desktop')} {
    max-width: ${getBreakPoints().desktop}px;
  }

  ${media('<=desktop', '>tablet')} {
    max-width: ${getBreakPoints().tablet}px;
  }
`;
