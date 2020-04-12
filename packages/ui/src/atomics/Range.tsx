/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC, memo, ReactNode, useCallback } from 'react';
import { getTrackBackground, Range as ReactRange } from 'react-range';
import type { IProps as ReactRangeProps } from 'react-range/lib/types';
import colors from '../styles/colors';

export interface RangeProps
  extends Pick<
    ReactRangeProps,
    'step' | 'min' | 'max' | 'values' | 'onChange'
  > {
  renderThumbValue?: (value: number) => ReactNode;
}

const Range: FC<RangeProps> = memo(
  ({ step, min, max, values, onChange, renderThumbValue }) => {
    const renderThumb = useCallback<ReactRangeProps['renderThumb']>(
      ({ props, value }) => {
        return (
          <div {...props} css={thumbStyle}>
            <span css={thumbValueStyle}>
              {renderThumbValue?.(value) ?? value}
            </span>
          </div>
        );
      },
      [renderThumbValue],
    );

    const renderTrack: ReactRangeProps['renderTrack'] = useCallback(
      ({ props, children, disabled, isDragged }) => {
        return (
          <div css={trackWrapperStyle}>
            <div
              {...props}
              css={trackStyle}
              style={{
                background: getTrackBackground({
                  values,
                  colors: [colors.gray, colors.green, colors.gray],
                  max,
                  min,
                }),
              }}
            >
              {children}
            </div>
          </div>
        );
      },
      [values, max, min],
    );

    return (
      <ReactRange
        {...{ step, min, max, values, onChange }}
        renderTrack={renderTrack}
        renderThumb={renderThumb}
      />
    );
  },
);

const thumbStyle = css`
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background-color: ${colors.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
`;

const thumbValueStyle = css`
  position: absolute;
  top: -20px;

  font-size: 0.625rem;
  font-weight: 800;
  color: ${colors.white};
  background-color: ${colors.darkGreen};
  left: 50%;
  transform: translateX(-50%);
  height: 1rem;

  display: inline-flex;
  align-items: center;
  padding: 0 0.25rem;
  border-radius: 1rem;
  white-space: nowrap;
`;

const trackWrapperStyle = css`
  height: 2.5rem;
  display: flex;
  align-items: flex-end;
  padding: 0 0.5rem 10px;
`;

const trackStyle = css`
  height: 4px;
  border-radius: 6px;
  background-color: ${colors.gray};
  width: 100%;
`;

Range.displayName = 'Range';

export default Range;
