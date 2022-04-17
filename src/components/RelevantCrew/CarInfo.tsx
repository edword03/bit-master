import React from 'react';
import carIcon from '../../assets/images/svg/carIcon.svg';
import { useSelector } from '../../services/hooks';
import { getCrewListState } from '../../services/selectors';

import styles from './RelevantCrew.module.css';

export const CarInfo = () => {
  const { crewList } = useSelector(getCrewListState);
  const { car_mark, car_model, car_color, car_number } = crewList[0];

  return (
    <div className={styles.card}>
      <img src={carIcon} alt="car icon" className={styles.carIcon} />
      <div>
        <h3 className={styles.carTitle}>
          {car_mark} {car_model}
        </h3>
        <p className={styles.carColor}>{car_color}</p>
        <span className={styles.carNumber}>{car_number}</span>
      </div>
    </div>
  );
};
