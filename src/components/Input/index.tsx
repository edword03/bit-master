import React, { useEffect } from 'react';
import { withYMaps } from 'react-yandex-maps';
import { useDispatch, useSelector } from '../../services/hooks';
import { setNewAddress } from '../../services/map/mapActions';
import { ErrorStateType } from '../../types/errorTypes';

import styles from './Input.module.css';

interface InputProps {
  ymaps?: any;
  errorState: ErrorStateType;
  handleErrorSate: (isError: boolean, errorMessage: string) => void;
}

export const Input: React.ComponentType<InputProps> = withYMaps(
  ({ ymaps, errorState, handleErrorSate }) => {
    const { address } = useSelector(state => state.map);
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
          handleErrorSate(false, '');
        });
      }
    }, [ymaps.SuggestView, ymaps, dispatch, handleErrorSate]);

    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (address.length > 0) {
        handleErrorSate(false, '');;
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
              className={`${styles.input} ${errorState.isError ? styles.error : ''}`}
              id="suggest"
            />
            {errorState.isError && <p className={styles.errorText}>{errorState.errorMessage}</p>}
          </div>
        </label>
      </>
    );
  },
  true,
  ['SuggestView', 'coordSystem.geo'],
);
