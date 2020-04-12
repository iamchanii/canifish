/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import type { ButtonHTMLAttributes, FC } from 'react';
import colors from '../styles/colors';
import Text, { TextColor } from './Text';

export enum ButtonVariant {
  PRIMARY,
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = ({
  variant = ButtonVariant.PRIMARY,
  children,
  ...restProps
}) => {
  return (
    <button data-button css={getButtonStyle({ variant })} {...restProps}>
      <Text color={TextColor.WHITE}>{children}</Text>
    </button>
  );
};

const getButtonStyle = ({ variant }: { variant: ButtonVariant }) => {
  return css`
    padding: 0 1rem;
    border-radius: 0.5rem;
    border: none;
    outline: 0;
    cursor: pointer;
    height: 2rem;
    appearance: none;
    ${variants[variant]};

    &:disabled {
      color: ${colors.gray};
      background: ${colors.lightGray};
      cursor: not-allowed;
    }
  `;
};

// TODO: 각 Variant 별 Hover, Active 색상 논의
const variants: { [key in ButtonVariant]: SerializedStyles } = {
  [ButtonVariant.PRIMARY]: css`
    &:not(:disabled) {
      background: ${colors.green};
    }
  `,
};

Button.displayName = 'Button';

export default Button;
