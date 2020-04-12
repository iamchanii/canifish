/** @jsx jsx */
import {
  ApplyMonths,
  Card,
  IconText,
  Image,
  Text,
  TextColor,
  TextSize,
} from '@canifish/ui';
import { css, jsx } from '@emotion/core';
import { FC } from 'react';
import { FaClock, FaFish, FaMapPin } from 'react-icons/fa';

export interface FishCardProps {
  /** 생선 이름 */
  name: string;
  /** 가격 */
  price: number;
  /** 출현 시간 */
  applyHours: string;
  /** 출현 장소 */
  place: string;
  /** 그림자 크기 */
  shadowSize: string;
  /** 출현 기간 */
  applyMonths: number[];
  /** 이미지 URL */
  imageUrl: string;
}

const { format } = new Intl.NumberFormat();

const FishCard: FC<FishCardProps> = ({
  name,
  price,
  applyHours,
  place,
  shadowSize,
  applyMonths,
  imageUrl,
}) => {
  return (
    <Card css={fishCardStyle}>
      <Image src={imageUrl} alt={name} />
      <div css={nameAndPriceAndInformationStyle}>
        <div css={nameAndPriceStyle}>
          <Text color={TextColor.BROWN} size={TextSize.MEDIUM}>
            {name}
          </Text>
          <Text color={TextColor.GREEN} size={TextSize.MEDIUM}>
            {format(price)}벨
          </Text>
        </div>
        <div css={informationStyle}>
          <IconText
            className="time"
            icon={<FaClock />}
            color={TextColor.LIGHT_BROWN}
            size={TextSize.SMALL}
          >
            {applyHours}
          </IconText>
          <IconText
            icon={<FaMapPin />}
            color={TextColor.LIGHT_BROWN}
            size={TextSize.SMALL}
          >
            {place}
          </IconText>
          <IconText
            icon={<FaFish />}
            color={TextColor.LIGHT_BROWN}
            size={TextSize.SMALL}
          >
            {shadowSize}
          </IconText>
        </div>
      </div>
      <ApplyMonths applyMonths={applyMonths} />
    </Card>
  );
};

const fishCardStyle = css`
  display: flex;
  align-items: center;

  .apply-months {
    margin-left: auto;
    flex-shrink: 0;
  }
`;

const nameAndPriceAndInformationStyle = css`
  margin-right: auto;
`;

const nameAndPriceStyle = css`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: baseline;

  [data-text]:first-of-type {
    margin: 0 0.25rem 0 0;
  }
`;

const informationStyle = css`
  display: flex;
  flex-wrap: wrap;

  [data-icon-text] {
    margin: 0.125rem 0;

    &.time {
      flex: 0 0 100%;
    }
  }

  [data-icon-text] + [data-icon-text]:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

FishCard.displayName = 'FishCard';

export default FishCard;
