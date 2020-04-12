/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import type { FC } from 'react';
import Text, { TextColor, TextSize } from '../atomics/Text';
import colors from '../styles/colors';

const range = (length: number) => [...Array(length).keys()];

export interface ApplyMonthsProps {
  applyMonths: number[];
}

const ApplyMonths: FC<ApplyMonthsProps> = ({ applyMonths }) => {
  return (
    <ul className="apply-months" css={listStyle}>
      {range(12).map((index) => {
        const isActive = applyMonths.includes(index);
        const color = isActive ? TextColor.WHITE : TextColor.BROWN;

        return (
          <li key={index} css={itemStyle}>
            <Text
              color={color}
              size={TextSize.XSMALL}
              css={[itemTextStyle, isActive && activeItemTextStyle]}
            >
              {index + 1}
            </Text>
          </li>
        );
      })}
    </ul>
  );
};

ApplyMonths.displayName = 'ApplyMonths';

const listStyle = css`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  width: 5rem;
`;

const itemStyle = css`
  padding: 0.125rem;
`;

export const APPLY_MONTHS_BG_COLOR_VARIABLE = '--apply-months-bg-color';

const activeItemTextStyle = css`
  background-color: var(${APPLY_MONTHS_BG_COLOR_VARIABLE}, ${colors.yellow});
`;

export const APPLY_MONTHS_ACTIVE_BG_COLOR_VARIABLE =
  '--apply-months-active-bg-color';

const itemTextStyle = css`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(
    ${APPLY_MONTHS_ACTIVE_BG_COLOR_VARIABLE},
    ${colors.beige}
  );
`;

export default ApplyMonths;
