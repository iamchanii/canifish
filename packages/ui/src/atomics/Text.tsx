/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import type { FC } from 'react';
import colors from '../styles/colors';

export enum TextColor {
  BROWN = colors.brown as any,
  LIGHT_BROWN = colors.lightBrown as any,
  WHITE = colors.white as any,
  GREEN = colors.green as any,
}

export enum TextSize {
  XSMALL = '0.625rem',
  SMALL = '0.75rem',
  MEDIUM = '0.875rem',
  LARGE = '1rem',
}

const TextLineHeight: { [key in TextSize]: string } = {
  [TextSize.XSMALL]: '0.6875rem',
  [TextSize.SMALL]: '0.875rem',
  [TextSize.MEDIUM]: '1rem',
  [TextSize.LARGE]: '1.125rem',
};

export interface TextProps {
  className?: string;
  color?: TextColor;
  size?: TextSize;
}

const Text: FC<TextProps> = ({
  children,
  className,
  color = TextColor.BROWN,
  size = TextSize.MEDIUM,
}) => {
  return (
    <span
      data-text
      css={getTextStyle({ color, size })}
      className={className}
      children={children}
    />
  );
};

export const getTextStyle = ({ color, size }: TextProps) => {
  const lineHeight = TextLineHeight[size];

  return css`
    letter-spacing: -0.04em;
    color: ${color};
    font-size: ${size};
    line-height: ${lineHeight};
    font-weight: 800;
  `;
};

Text.displayName = 'Text';

export default Text;
