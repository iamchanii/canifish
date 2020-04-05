/** @jsx jsx */

import { fishDatabase } from '@canifish/database';
import { Select } from '@canifish/ui';
import { css, jsx } from '@emotion/core';
import React from 'react';
import storageKey from '../../constants/storageKey';
import text from '../../constants/text';
import usePromise from '../../hooks/usePromise';
import containerStyle from '../../styles/containerStyle';
import FishList from './FishList';
import { Hemisphere } from './interface';
import groupFishesByNow from './lib/groupFishesByNow';

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

  return (
    <div>
      <div css={[containerStyle, filterStyle]}>
        <Select defaultValue={hemisphere} onChange={handleChangeHemisphere}>
          <option value="northern">{text.NORTHERN}</option>
          <option value="southern">{text.SOUTHERN}</option>
        </Select>
      </div>

      <FishList fishes={available} listText="지금 잡을수 있는 물고기" />
      <FishList fishes={etc} listText="그 외 물고기" />
    </div>
  );
};

FishListContainer.displayName = 'FishListContainer';

export default FishListContainer;

const filterStyle = css`
  padding: 0.5rem;
`;
