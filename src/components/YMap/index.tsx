import React, { useState, useEffect, useCallback } from 'react';
import { YMaps, Map, Placemark, YMapsApi } from 'react-yandex-maps';
import { searchCrewBody, sliceAddress } from '../../utils';
import { useMap } from '../../hooks/useMap';
import { useDebounce } from '../../hooks/useDebounce';
import { useSelector, useDispatch } from '../../services/hooks';
import { setNewAddress, setCoords } from '../../services/map/mapActions';
import { getCrewList } from '../../services/crew/crewActions';

import styles from './YMap.module.css';

import { CoordsArray } from '../../types/mapTypes';
import { Loader } from '../Loader';

interface YMapPropsType {
  handleErrorSate: (isError: boolean, errorMessage: string) => void
}

export const YMap: React.FC<YMapPropsType> = ({ handleErrorSate }) => {
  const {
    address,
    coords: { lat, lon },
  } = useSelector(state => state.map);
  const { crewList } = useSelector(state => state.crew);

  const [loading, setLoading] = useState(true);
  const { ymaps, mapRef, setIconCaption, setIconColor, renderPlaceMark, setMapRef } = useMap();

  const dispatch = useDispatch();

  const getAddressByCoords = useCallback(
    async (coords: CoordsArray) => {
      setIconCaption('Загрузка..');
      const result = await ymaps.current.geocode(coords);

      if (result) {
        const firstGeoObject = result.geoObjects.get(0);

        if (firstGeoObject) {
          const newAddress = sliceAddress(firstGeoObject.getAddressLine());

          if (newAddress) {
            dispatch(setNewAddress(newAddress));
            setIconCaption(newAddress);
            setIconColor('yellow');
            handleErrorSate(false, '')
          } else {
            setIconCaption('Адрес не найден');
            setIconColor('red');
          }
        }
      }
    },
    [dispatch, setIconCaption, setIconColor, ymaps, handleErrorSate],
  );

  const onMapClick = useCallback(
    (e: YMapsApi) => {
      const coords = e.get('coords');
      dispatch(setCoords(coords));
      renderPlaceMark(coords);
      getAddressByCoords(coords);
    },
    [getAddressByCoords, renderPlaceMark, dispatch],
  );

  const updatePlaceMark = useDebounce(async () => {
    const result = await ymaps.current.geocode(address, {
      boundedBy: [
        [56.97117541518604, 52.77815112379082],
        [56.71617143140125, 53.64194829418939],
      ],
      strictBounds: true,
    });

    if (result) {
      const firstObject = result.geoObjects.get(0);
      if (firstObject) {
        const coords = result.geoObjects.get(0).geometry.getCoordinates();
        let errorMessage = '';

        switch (firstObject.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
          case 'exact':
            break;
          case 'number':
          case 'near':
          case 'range':
            errorMessage = 'Неточный адрес, требуется уточнение';
            break;
          case 'street':
            errorMessage = 'Неполный адрес, требуется уточнение';
            break;
          case 'other':
          default:
            errorMessage = 'Неточный адрес, требуется уточнение';
        }

        if (errorMessage) {
          handleErrorSate(true, errorMessage)
        } else {
          mapRef.current.setCenter(coords);
          renderPlaceMark(coords);
          setIconCaption(address);
          dispatch(setCoords(coords));
          dispatch(getCrewList(searchCrewBody({ address, lat, lon })));
        }
      } else {
        handleErrorSate(true, 'Адрес не найден')
      }
    }
  }, 1000);

  const onLoad = (ymapsInstance: YMapsApi) => {
    ymaps.current = ymapsInstance;
    setLoading(false);
  };

  useEffect(() => {
    if (ymaps.current && address) {
      updatePlaceMark();
    }
  }, [ymaps, dispatch, address]);

  return (
    <div className={styles.map}>
      <YMaps query={{ apikey: process.env.REACT_APP_API_KEY, ns: 'ymaps' }}>
        {loading && <Loader />}
        <Map
          modules={['Placemark', 'geocode', 'geoObject.addon.balloon']}
          defaultState={{ center: [56.839439, 53.218803], zoom: 12 }}
          width="100%"
          height="500px"
          instanceRef={setMapRef}
          onLoad={onLoad}
          onClick={onMapClick}>
          {crewList.length > 0 &&
            crewList.map(car => (
              <Placemark
                key={`placemark-${car.crew_id}`}
                geometry={[car.lat, car.lon]}
                options={{ iconColor: 'green' }}
              />
            ))}
        </Map>

      </YMaps>
    </div>
  );
};
