import { Ref, useCallback, useRef } from 'react';
import { ObjectManagerFeature } from 'react-yandex-maps';
import { CoordsArray, RefType } from '../types/mapTypes';

export const useMap = () => {
  const placemarkRef = useRef<{ current: ObjectManagerFeature } | any>(null);
  const ymaps = useRef<RefType>(null);
  const mapRef = useRef<RefType>(null);

  const createPlacemark = useCallback(
    (coords: CoordsArray) => {
      return new ymaps.current.Placemark(
        coords,
        {},
        {
          preset: 'islands#violetDotIconWithCaption',
          iconColor: 'yellow',
        },
      );
    },
    [ymaps],
  );

  const renderPlaceMark = useCallback(
    coords => {
      if (placemarkRef.current) {
        placemarkRef.current.geometry.setCoordinates(coords);
      } else {
        placemarkRef.current = createPlacemark(coords);
        mapRef.current.geoObjects.add(placemarkRef.current);
      }
    },
    [placemarkRef, mapRef, createPlacemark],
  );

  const setIconCaption = (adress: string) => {
    placemarkRef.current.properties.set({
      iconCaption: adress,
    });
  };

  const setIconColor = (color: 'yellow' | 'red' | 'green') => {
    placemarkRef.current.options.set({
      iconColor: color,
    });
  };

  const setMapRef = useCallback(
    (instance: Ref<any>) => {
      mapRef.current = instance;
    },
    [mapRef],
  );

  return { ymaps, mapRef, setIconCaption, setIconColor, renderPlaceMark, setMapRef };
};
