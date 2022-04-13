import React from 'react';
import { CrewItem } from './CrewItem';
import { useSelector } from '../../services/hooks';

import styles from './CrewList.module.css';

export const CrewList = () => {
  const { crewList } = useSelector(state => state.crew);

  return (
    <section className={styles.section}>
      <ul className={styles.carList}>
        {crewList.length > 0 &&
          crewList.map(crew => (
            <CrewItem
              key={crew.crew_id}
              name={`${crew.car_mark} ${crew.car_model}`}
              color={crew.car_color}
              distance={crew.distance}
            />
          ))}
      </ul>
    </section>
  );
};
