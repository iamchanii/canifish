/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import type { FC } from 'react';
import colors from './colors';

const style = css`
  list-style: none;
  background: ${colors.white};
  border-radius: 8px;
  padding: 1rem 2rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  /** 이미지 */
  > figure,
  p {
    margin: 0;
  }

  /** 이미지 영역 */
  > figure > img {
    width: 3rem;
    height: 3rem;
    display: block;
    border-radius: 9999px;
    background: ${colors.gray};
    margin-bottom: 0.5rem;
  }

  /** 생선 이름, 가격 */
  .name,
  .price {
    font-size: 0.75rem;
    line-height: 0.875rem;
    font-weight: 800;
    text-align: center;
    white-space: pre;
  }

  .name {
    color: ${colors.brown};
  }

  /** 가격 */
  .price {
    color: ${colors.green};
  }
`;

export interface FishCardProps {
  /** 생선 이름 */
  name: string;
  /** 가격 */
  price: number;
}

const { format } = new Intl.NumberFormat();

export const FishCard: FC<FishCardProps> = ({ name, price }) => {
  return (
    <li css={style}>
      <figure>
        <img alt="" />
      </figure>
      <p className="name">{name}</p>
      <p className="price">{format(price)}</p>
    </li>
  );
};

FishCard.displayName = 'FishCard';
