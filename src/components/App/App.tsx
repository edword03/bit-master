import React from 'react';
import { YMaps } from 'react-yandex-maps';
import { YMap, RelevantCrew, CrewList, Input } from '../';
import { useDispatch, useSelector } from '../../services/hooks';
import { useActions } from '../../services/hooks/useActions';

import styles from './App.module.css';

import { fetchData } from '../../api';
import { createOrderBody } from '../../utils';
import { getErrorState, getMapState, getCrewListState } from '../../services/selectors';

interface OrderType {
  code: number;
  descr: string;
  data: {
    order_id: number;
  };
}

export const App = () => {
  const { address, coords } = useSelector(getMapState);
  const { isError } = useSelector(getErrorState);
  const { crewList } = useSelector(getCrewListState);

  const { setErrorState } = useActions();

  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (address.length > 0) {
      const result = await fetchData<OrderType>(
        'order',
        createOrderBody({ ...coords, address }, crewList[0].crew_id),
      );
      console.log('order: ', result);
    } else {
      dispatch(setErrorState('Это поле обязательное'));
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Детали заказа</h3>
      <main>
        <form onSubmit={onSubmit}>
          <YMaps>
            <Input />
          </YMaps>
          {crewList.length > 0 && <RelevantCrew />}
          <div style={{ display: 'flex' }}>
            <YMap />
            {crewList.length > 0 && <CrewList />}
          </div>
          <button className={styles.button} disabled={isError}>
            Заказать
          </button>
        </form>
      </main>
    </div>
  );
};
