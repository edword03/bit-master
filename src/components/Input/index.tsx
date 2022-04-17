import React, { useEffect } from 'react';
import { withYMaps } from 'react-yandex-maps';

import { useDispatch, useSelector } from '../../services/hooks';
import { useActions } from '../../services/hooks/useActions';

import { getErrorState, getMapState } from '../../services/selectors';

import styles from './Input.module.css';

interface InputProps {
  ymaps?: any;
}

export const Input: React.ComponentType<InputProps> = withYMaps(
  ({ ymaps }) => {
    const { address } = useSelector(getMapState);
    const { isError, errorMessage } = useSelector(getErrorState);
    const { setNewAddress, clearErrorState } = useActions();
    const dispatch = useDispatch();

    useEffect(() => {
      if (ymaps) {
        const suggestView = new ymaps.SuggestView('suggest', {
          boundedBy: [
            [56.97117541518604, 52.77815112379082],
            [56.98107881830961, 53.47463554492185],
          ],
        });
        suggestView.events.add('select', (e: any) => {
          const itemName = e.get('item').displayName.split(', ').slice(0, 2).join(', ');
          dispatch(setNewAddress(itemName));
          dispatch(clearErrorState());
        });
      }
    }, [ymaps.SuggestView, ymaps, dispatch]);

    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (address.length > 0) {
        dispatch(clearErrorState());
      }

      dispatch(setNewAddress(value));
    };

    return (
      <>
        <label className={styles.inputBlock}>
          <span>Откуда</span>
          <div style={{ width: '100%' }}>
            <input
              type="text"
              value={address}
              onChange={onChangeInputValue}
              className={`${styles.input} ${isError ? styles.error : ''}`}
              id="suggest"
            />
            {isError && <p className={styles.errorText}>{errorMessage}</p>}
          </div>
        </label>
      </>
    );
  },
  true,
  ['SuggestView', 'coordSystem.geo'],
);
