/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC } from 'react';
import { FaCheck } from 'react-icons/fa';
import colors from '../styles/colors';
import Text, { TextColor, TextSize } from './Text';

export interface CheckboxProps {
  disabled?: boolean;
  id?: any;
}

const Checkbox: FC<CheckboxProps> = ({ children, disabled, id }) => {
  return (
    <label data-checkbox css={style}>
      <span data-checkbox-icon>
        <input type="checkbox" id={id} disabled={disabled} />
        <FaCheck />
      </span>
      <Text color={TextColor.BROWN} size={TextSize.SMALL}>
        {children}
      </Text>
    </label>
  );
};

const style = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  > [data-checkbox-icon] {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    background-color: ${colors.beige};
    border-radius: 0.5rem;
    margin-right: 0.5em;

    > svg {
      color: ${colors.brown};
      width: 0.75rem;
    }

    > input[type='checkbox'] {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      appearance: none;
      pointer-events: none;
      outline: 0;

      &:not(:checked) ~ svg {
        display: none;
      }

      &:checked ~ svg {
        display: block;
      }
    }
  }
`;

Checkbox.displayName = 'Checkbox';

export default Checkbox;
