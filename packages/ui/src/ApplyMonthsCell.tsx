/* @jsx jsx */
import { css, jsx } from '@emotion/core';
import type { FC } from 'react';
import colors from './colors';

export type ApplyMonthsCellVariant = 'default' | 'active';

export interface ApplyMonthsCellProps {
  variant?: ApplyMonthsCellVariant;
}

export const ApplyMonthsCell: FC<ApplyMonthsCellProps> = ({
  children,
  variant = 'default',
}) => <span css={[style, variants[variant]]}>{children}</span>;

ApplyMonthsCell.displayName = 'ApplyMonthsCell';

const style = css`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 0.625rem;
`;

const variants = {
  default: css`
    background-color: ${colors.beige};
    color: ${colors.brown};
  `,
  active: css`
    background-color: ${colors.yellow};
    color: ${colors.white};
  `,
};
