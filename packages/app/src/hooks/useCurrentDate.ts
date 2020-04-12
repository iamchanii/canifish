import { useEffect, useState } from 'react';

/**
 * 현재 화면에 다시 포커스가 될 때 마다 date를 갱신하는 훅
 */
const useCurrentDate = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const onWindowFocus = () => {
      setDate(new Date());
    };

    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.addEventListener('focus', onWindowFocus);
    };
  }, []);

  return date;
};

export default useCurrentDate;
