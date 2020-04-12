/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import type { FC, HTMLAttributes } from 'react';
import colors from '../styles/colors';

export interface CardProps extends HTMLAttributes<HTMLElement> {}

const Card: FC<CardProps> = (props) => {
  return <div css={style} {...props} />;
};

const style = css`
  background-color: ${colors.white};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
  padding: 1rem;
`;

export default Card;
