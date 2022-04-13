import React, { useState, useCallback } from 'react';
import { YMaps } from 'react-yandex-maps';
import { YMap, RelevantCrew, CrewList, Input } from '../';
import { useSelector } from '../../services/hooks';

import styles from './App.module.css';

import { ErrorStateType } from '../../types/errorTypes';
import { fetchData } from '../../api';
import { createOrderBody } from '../../utils';

interface OrderType {
  code: number
  descr: string
  data: {
    order_id: number
  }
}

export const App = () => {
  const { address, coords } = useSelector(state => state.map);
  const [errorState, setErrorState] = useState<ErrorStateType>({
    isError: false,
    errorMessage: '',
  });

  const { crewList } = useSelector(state => state.crew);

  const handleErrorSate = useCallback((isError: boolean, errorMessage: string) => {
    setErrorState(prev => ({ ...prev, isError, errorMessage }))
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (address.length > 0) {
      const result = await fetchData<OrderType>(
        'order',
        createOrderBody({ ...coords, address }, crewList[0].crew_id),
      );
      console.log('order: ', result);
    } else {
      handleErrorSate(true, 'Это поле обязательное')
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Детали заказа</h3>
      <main>
        <form onSubmit={onSubmit}>
          <YMaps>
            <Input errorState={errorState} handleErrorSate={handleErrorSate} />
          </YMaps>
          {crewList.length > 0 && <RelevantCrew />}
          <div style={{ display: 'flex' }}>
            <YMap handleErrorSate={handleErrorSate} />
            {crewList.length > 0 && <CrewList />}
          </div>
          <button className={styles.button} disabled={errorState.isError}>
            Заказать
          </button>
        </form>
      </main>
    </div>
  );
}
