/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import type { FC, ReactNode } from 'react';
import colors from '../styles/colors';

export interface FormLabelProps {
  label: ReactNode;
  htmlFor?: any;
}

const FormLabel: FC<FormLabelProps> = ({ label, htmlFor, children }) => {
  return (
    <div css={style}>
      <label htmlFor={htmlFor}>{label}</label>
      <div>{children}</div>
    </div>
  );
};

const style = css`
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  > label {
    font-weight: 800;
    font-size: 0.875rem;
    color: ${colors.lightBrown};

    display: block;
    margin-bottom: 0.5rem;
  }
`;

FormLabel.displayName = 'FormLabel';

export default FormLabel;
