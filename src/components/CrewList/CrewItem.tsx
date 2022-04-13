import React from 'react';

import carIcon from '../../assets/images/svg/carIcon.svg';
import arrowIcon from '../../assets/images/svg/arrow-right.svg';

import styles from './CrewList.module.css';

interface CrewItemPropsType {
  name: string;
  color: string;
  distance: number;
}

export const CrewItem: React.FC<CrewItemPropsType> = ({ name, color, distance }) => {
  return (
    <li className={styles.item}>
      <div style={{ display: 'flex' }}>
        <img src={carIcon} alt="" className={styles.carIcon} />
        <div>
          <h3>{name}</h3>
          <p className={styles.subTitle}>{color}</p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <img src={arrowIcon} alt="" className={styles.arrowRight} />
        <p className={styles.distance}>{distance} м</p>
      </div>
    </li>
  );
};
