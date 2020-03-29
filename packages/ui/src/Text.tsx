/* @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import colors from './colors';

const style = css`
  letter-spacing: -0.02em;
`;

export type TextVariants = 'listTitle';

const variants: { [key in TextVariants]: any } = {
  listTitle: css`
    color: ${colors.brown};
    font-weight: 800;
    font-size: 0.875rem;
    line-height: 1rem;
    text-align: center;
  `,
};

export interface TextProps {
  variant: TextVariants;
}

export const Text: React.FC<TextProps> = React.memo(({ children, variant }) => {
  return (
    <p css={[style, variants[variant]]} className="text">
      {children}
    </p>
  );
});

Text.displayName = 'Text';
