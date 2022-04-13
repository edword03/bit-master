import React from 'react';
import {CarInfo} from './CarInfo'

import styles from './RelevantCrew.module.css';

export const RelevantCrew = () => {
  return (
    <section className={styles.block}>
      <h2 className={styles.blockTitle}>Подходящий экипаж:</h2>
      <CarInfo />
    </section>
  );
};
