import { Ref, useCallback, useRef } from 'react';
import { ObjectManagerFeature, YMapsApi } from 'react-yandex-maps';

import { getCrewList } from '../services/crew/crewActions';
import { useDispatch, useSelector } from '../services/hooks';
import { getMapState } from '../services/selectors';
import { useActions } from '../services/hooks/useActions';

import { CoordsArray, RefType } from '../types/mapTypes';

import { searchCrewBody, sliceAddress } from '../utils';
import { useDebounce } from './useDebounce';

export const useMap = () => {
  const placemarkRef = useRef<{ current: ObjectManagerFeature } | any>(null);
  const ymaps = useRef<RefType>(null);
  const mapRef = useRef<RefType>(null);
  const {
    address,
    coords: { lat, lon },
  } = useSelector(getMapState);

  const { setCoords, setNewAddress, setErrorState, clearErrorState } = useActions();

  const dispatch = useDispatch();

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

  const setIconCaption = useCallback((adress: string) => {
    placemarkRef.current.properties.set({
      iconCaption: adress,
    });
  }, []);

  const setIconColor = useCallback((color: 'yellow' | 'red' | 'green') => {
    placemarkRef.current.options.set({
      iconColor: color,
    });
  }, []);

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
            dispatch(clearErrorState());
          } else {
            setIconCaption('Адрес не найден');
            setIconColor('red');
          }
        }
      }
    },
    [dispatch, setIconCaption, setIconColor, ymaps, clearErrorState, setNewAddress],
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
          dispatch(setErrorState(errorMessage));
        } else {
          mapRef.current.setCenter(coords);
          renderPlaceMark(coords);
          setIconCaption(address);
          dispatch(setCoords(coords));
          dispatch(getCrewList(searchCrewBody({ address, lat, lon })));
        }
      } else {
        dispatch(setErrorState('Адрес не найден'));
      }
    }
  }, 1000);

  const onMapClick = useCallback(
    (e: YMapsApi) => {
      const coords = e.get('coords');
      dispatch(setCoords(coords));
      renderPlaceMark(coords);
      getAddressByCoords(coords);
    },
    [getAddressByCoords, renderPlaceMark, dispatch, setCoords],
  );

  const setMapRef = useCallback(
    (instance: Ref<any>) => {
      mapRef.current = instance;
    },
    [mapRef],
  );

  return { ymaps, setMapRef, updatePlaceMark, onMapClick };
};
