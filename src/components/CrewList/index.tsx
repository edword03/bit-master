import React from 'react';
import { CrewItem } from './CrewItem';
import { useSelector } from '../../services/hooks';

import styles from './CrewList.module.css';
import { getCrewListState } from '../../services/selectors';

export const CrewList = () => {
  const { crewList } = useSelector(getCrewListState);

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
