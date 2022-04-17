import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, YMapsApi } from 'react-yandex-maps';

import { useMap } from '../../hooks/useMap';
import { useSelector } from '../../services/hooks';
import { getCrewListState, getMapState } from '../../services/selectors';

import styles from './YMap.module.css';

import { Loader } from '../Loader';

export const YMap: React.FC = () => {
  const { address } = useSelector(getMapState);
  const { crewList } = useSelector(getCrewListState);

  const [loading, setLoading] = useState(true);
  const { ymaps, setMapRef, updatePlaceMark, onMapClick } = useMap();

  const onLoad = (ymapsInstance: YMapsApi) => {
    ymaps.current = ymapsInstance;
    setLoading(false);
  };

  useEffect(() => {
    if (ymaps.current && address) {
      updatePlaceMark();
    }
  }, [ymaps, address]);

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
