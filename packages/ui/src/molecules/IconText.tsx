/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC, ReactNode } from 'react';
import Text, { TextProps } from '../atomics/Text';

export interface IconTextProps extends TextProps {
  className?: string;
  icon: ReactNode;
}

const IconText: FC<IconTextProps> = ({
  className,
  icon,
  color,
  size,
  children,
}) => {
  return (
    <div
      data-icon-text
      className={className}
      css={style}
      style={{ color: color.toString() }}
    >
      {icon}
      <Text color={color} size={size}>
        {children}
      </Text>
    </div>
  );
};

const style = css`
  display: flex;
  align-items: center;

  svg {
    width: 0.75rem;
    margin-right: 0.25rem;
    color: inherit;
  }
`;

IconText.displayName = 'IconText';

export default IconText;
