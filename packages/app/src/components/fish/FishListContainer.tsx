/** @jsx jsx */

import { fishDatabase, FishPlace, FishShadowSize } from '@canifish/database';
import {
  Button,
  Card,
  Checkbox,
  FormLabel,
  Range,
  Select,
  Text,
} from '@canifish/ui';
import { css, jsx } from '@emotion/core';
import React from 'react';
import storageKey from '../../constants/storageKey';
import text from '../../constants/text';
import usePromise from '../../hooks/usePromise';
import groupFishesByNow from '../../lib/groupFishesByNow';
import containerStyle from '../../styles/containerStyle';
import FishCardList from '../templates/FishCardList';
import { Hemisphere } from './interface';

const FishListContainer: React.FC = () => {
  const fishes = usePromise(fishDatabase.get);

  /**
   * 현재 시간 Date 객체.
   */
  const [date, setDate] = React.useState<Date>(() => new Date());
  const nowMonth = date.getMonth();
  const nowHours = date.getHours();

  /**
   * 현재 화면에 다시 포커스가 될 때 마다 date를 갱신.
   */
  React.useEffect(() => {
    const onWindowFocus = () => {
      setDate(new Date());
    };

    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.addEventListener('focus', onWindowFocus);
    };
  }, []);

  /**
   * 반구(북반구, 남반구) 상태값. 초기에 로컬 스토리지에서 값을 가져옴.
   */
  const [hemisphere, setHemisphere] = React.useState<Hemisphere>(
    (localStorage.getItem(storageKey.HEMISPHERE) as Hemisphere) ?? 'northern',
  );

  /**
   * 반구 변경 시 상태를 변경하고 로컬 스토리지에도 값을 저장함.
   */
  const handleChangeHemisphere = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const nextHemisphere = e.target.value as Hemisphere;
      setHemisphere(nextHemisphere);
      localStorage.setItem(storageKey.HEMISPHERE, nextHemisphere);
    },
    [],
  );

  /**
   * 물고기 데이터 배열을 현재 월/시간과 반구를 바탕으로 분류.
   * 자세한 내용은 해당 함수 참조.
   */
  const { available, etc } = React.useMemo(
    () => groupFishesByNow(fishes, nowMonth, nowHours, hemisphere),
    [fishes, nowHours, nowMonth, hemisphere],
  );

  const [prices, setPrices] = React.useState([0, 1000]);

  return (
    <div>
      <Card css={[containerStyle, filterStyle]}>
        <FormLabel label="위치" htmlFor="hemisphere">
          <Select
            id="hemisphere"
            defaultValue={hemisphere}
            onChange={handleChangeHemisphere}
          >
            <option value="northern">{text.NORTHERN}</option>
            <option value="southern">{text.SOUTHERN}</option>
          </Select>
        </FormLabel>

        <FormLabel label="판매금액">
          <Range
            min={0}
            max={15000}
            values={prices}
            onChange={setPrices}
            step={1000}
          />
        </FormLabel>

        <FormLabel label="출현장소">
          <Select defaultValue={hemisphere} onChange={handleChangeHemisphere}>
            <option value={FishPlace.RIVER}>{text.PLACE_RIVER}</option>
            <option value={FishPlace.CLIFFTOP}>{text.PLACE_CLIFFTOP}</option>
            <option value={FishPlace.MOUTH}>{text.PLACE_MOUTH}</option>
            <option value={FishPlace.POND}>{text.PLACE_POND}</option>
            <option value={FishPlace.OCEAN}>{text.PLACE_OCEAN}</option>
            <option value={FishPlace.PIER}>{text.PLACE_PIER}</option>
          </Select>
        </FormLabel>

        <FormLabel label="그림자">
          <div
            style={{
              display: 'grid',
              gridGap: '1rem',
              gridTemplateColumns: 'max-content max-content max-content',
            }}
          >
            <Select defaultValue={hemisphere} onChange={handleChangeHemisphere}>
              <option value={FishShadowSize.NARROW}>{text.SIZE_NARROW}</option>
              <option value={FishShadowSize.XSMALL}>{text.SIZE_XSMALL}</option>
              <option value={FishShadowSize.SMALL}>{text.SIZE_SMALL}</option>
              <option value={FishShadowSize.MEDIUM}>{text.SIZE_MEDIUM}</option>
              <option value={FishShadowSize.LARGE}>{text.SIZE_LARGE}</option>
              <option value={FishShadowSize.XLARGE}>{text.SIZE_XLARGE}</option>
              <option value={FishShadowSize.XXLARGE}>
                {text.SIZE_XXLARGE}
              </option>
            </Select>
            <Checkbox>지느러미</Checkbox>
            <Checkbox>울음소리</Checkbox>
          </div>
        </FormLabel>

        <FormLabel label="출현기간">
          <Select>
            <option value={1}>1월</option>
            <option value={2}>2월</option>
            <option value={3}>3월</option>
            <option value={4}>4월</option>
            <option value={5}>5월</option>
            <option value={6}>6월</option>
            <option value={7}>7월</option>
            <option value={8}>8월</option>
            <option value={9}>9월</option>
            <option value={10}>10월</option>
            <option value={11}>11월</option>
            <option value={12}>12월</option>
          </Select>
        </FormLabel>

        <Button style={{ marginTop: '1rem' }}>필터 적용</Button>
      </Card>

      <Text css={listTextStyle}>지금 잡을 수 있는 물고기</Text>
      <FishCardList fishes={available} />

      <Text css={listTextStyle}>그 외 물고기</Text>
      <FishCardList fishes={etc} />
    </div>
  );
};

FishListContainer.displayName = 'FishListContainer';

export default FishListContainer;

const filterStyle = css`
  padding: 0.5rem;
`;

const listTextStyle = css`
  display: block;
  text-align: center;
  margin: 2rem 0 1rem;
`;
