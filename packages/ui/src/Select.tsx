/* @jsx jsx */
import React, { FC, memo } from 'react';
import { jsx, css } from '@emotion/core';
import { colors } from '.';
import { FaAngleDown } from 'react-icons/fa';

export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export const Select: FC<SelectProps> = memo((props) => {
  return (
    <div css={style}>
      <select {...props} />
      <FaAngleDown />
    </div>
  );
});

Select.displayName = 'Select';

const style = css`
  position: relative;
  height: 2rem;
  display: inline-block;

  > select {
    color: ${colors.brown};
    padding: 0 2rem 0 1rem;
    background-color: ${colors.beige};
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
    appearance: none;

    font-weight: 800;
    font-family: inherit;
    font-size: 0.75rem;
    line-height: 0.875rem;
    letter-spacing: -0.02em;
    outline: none;
    cursor: pointer;
  }

  > svg {
    color: ${colors.brown};
    font-size: 1rem;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;
