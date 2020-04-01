/* @jsx jsx */
import { css, jsx } from '@emotion/core';
import type { FC } from 'react';
import colors from './colors';
import { ApplyMonthsCell } from './ApplyMonthsCell';

const range = (length: number) => [...Array(length).keys()];

export interface ApplyMonthsProps {
  applyMonths: number[];
}

export const ApplyMonths: FC<ApplyMonthsProps> = ({ applyMonths }) => {
  return (
    <ul className="apply-months" css={style}>
      {range(12).map((index) => {
        const variant = applyMonths.includes(index) ? 'active' : 'default';

        return (
          <li key={index}>
            <ApplyMonthsCell variant={variant}>{index + 1}</ApplyMonthsCell>
          </li>
        );
      })}
    </ul>
  );
};

const style = css`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  width: 5rem;

  > li {
    padding: 0.125rem;
  }
`;

ApplyMonths.displayName = 'ApplyMonths';
